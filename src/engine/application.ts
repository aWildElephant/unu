import { shuffle } from "~/util/shuffle"
import { deck, Card, ColoredCard, NumberCard, Draw2Card } from "./card"
import { Command } from "./command"
import { Event } from "./event"
import { PlayerIdAlreadyExists, NotEnoughPlayers, NotYourTurn, TooManyPlayers, InvalidGameStatus, InvalidCard, PlayerDoesNotHaveCard, Impossible } from './exceptions'
import { GameState, GameStatus } from "./game"
import { Player } from "./players"

function applyCardAddedToHand(gameState: GameState, card: Card, playerId: string): void {
    gameState.players.get(playerId)?.hand.add(card)
}

function applyCardRemovedFromHand(gameState: GameState, playerId: string, card: Card): void {
    gameState.players.get(playerId)?.hand.remove(card)
}

function applyCardDrawnEvent(gameState: GameState, playerId: string): void {
    const card = gameState.remainingCards.pop()
    if (card) {
        gameState.players.get(playerId)?.hand?.add(card)
    }
}

function applyCardPlayedEvent(gameState: GameState, card: Card): void {
    gameState.playedCards.push(card)
}

function applyEvent(gameState: GameState, event: Event): void {
    const type = event.type

    switch (type) {
        case "player-added":
            gameState.players.add(new Player(event.playerId))
            break
        case "played-cards-repurposed":
            gameState.repurposePlayedCards()
            break
        case "card-drawn":
            applyCardDrawnEvent(gameState, event.playerId)
            break
        case "card-played":
            applyCardPlayedEvent(gameState, event.card)
            break
        case "card-added-to-deck":
            gameState.remainingCards.push(event.card)
            break
        case "card-added-to-hand":
            applyCardAddedToHand(gameState, event.card, event.playerId)
            break
        case "card-removed-from-hand":
            applyCardRemovedFromHand(gameState, event.playerId, event.card)
            break
        default:
            console.error("Unsupported event '%s'", type)
    }
}

/**
 * Command-sourcing
 */
export class Application {

    private gameState = new GameState()
    private store: Command[] = []

    process(command: Command): Event[] {
        const events = this.validate(command)

        for (const event of events) {
            this.apply(event)
        }

        this.store.push(command)

        return events
    }

    // Visible for testing
    apply(event: Event): void {
        applyEvent(this.gameState, event)
    }

    private validate(command: Command): Event[] {
        const gameStatus = this.gameState.status

        const events: Event[] = []

        const type = command.type
        switch (type) {
            case "add-player":
                // Player cannot join mid-game
                if (gameStatus !== GameStatus.WAITING) {
                    throw new InvalidGameStatus(GameStatus.WAITING, this.gameState.status)
                }

                // There is a maximum of 10 players
                if (this.gameState.playerCount() >= 10) {
                    throw new TooManyPlayers()
                }

                const newPlayerId = command.playerId

                if (this.gameState.playerExists(newPlayerId)) {
                    throw new PlayerIdAlreadyExists(newPlayerId)
                }

                events.push({
                    type: "player-added",
                    playerId: newPlayerId
                })

                break
            case "start":
                // There is a minimum of 2 players
                if (this.gameState.playerCount() < 2) {
                    throw new NotEnoughPlayers()
                }

                // Fill the deck

                const cards = shuffle(deck())

                // Draw 7 cards for each player

                const playerIds = this.gameState.playerIds()

                for (let i = 0; i < 7; i++) {
                    playerIds.forEach(playerId => {
                        events.push({
                            type: "card-added-to-hand",
                            playerId,
                            card: this.last(cards)
                        })
                    })
                }

                // Set the first card, it must be colored so that the first player knows what to play

                let firstCardSet = false
                do {
                    const card = this.last(cards)

                    if (card instanceof ColoredCard) {
                        events.push({
                            type: "card-played",
                            card
                        })

                        firstCardSet = true
                    } else {
                        events.push({
                            type: "card-added-to-deck",
                            card
                        })
                    }
                } while (!firstCardSet)

                // Put remaining cards in the deck

                for (const card of cards) {
                    events.push({
                        type: "card-added-to-deck",
                        card
                    })
                }

                break
            case "draw":
                const currentPlayer = this.gameState.currentPlayer()

                const drawingPlayerId = command.playerId

                // Only current player can draw a card
                if (currentPlayer.id !== drawingPlayerId) {
                    throw new NotYourTurn()
                }

                if (this.gameState.remainingCards.size() <= 0) {
                    events.push({
                        type: "played-cards-repurposed"
                    })
                }

                events.push({
                    type: "card-drawn",
                    playerId: drawingPlayerId
                })

                break
            case "play":
                // TODO: check that the game is in the right state

                // TODO: implement cutting

                if (!this.gameState.currentPlayer().hand.contains(command.card)) {
                    throw new PlayerDoesNotHaveCard(command.card)
                }

                if (this.canPlay(command.card)) {
                    events.push({
                        type: "card-removed-from-hand",
                        card: command.card,
                        playerId: command.playerId
                    })

                    events.push({
                        type: "card-played",
                        card: command.card
                    })

                    // TODO: next player
                } else {
                    throw new InvalidCard(command.card)
                }

                break;
            default:
                // TODO
                throw new Error(`Command '${type}' not implemented`)
        }

        return events
    }

    /**
     * Return the last element of an array that is not empty. Throws if the array is empty
     */
    private last<T>(arr: T[]): T {
        const element = arr.pop()
        if (!element) {
            throw new Impossible()
        }
        return element
    }

    private canPlay(card: Card): boolean {
        const lastCard = this.gameState.playedCards.peek()

        if (lastCard instanceof NumberCard && card instanceof NumberCard && lastCard.num === card.num) {
            return true
        }

        if (lastCard instanceof ColoredCard && card instanceof ColoredCard && lastCard.color === card.color) {
            return true
        }

        if (lastCard instanceof Draw2Card && card instanceof Draw2Card) {
            return true
        }

        return false
    }
}