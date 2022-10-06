import { CircularDoubleLinkedList } from '~/util/circular-double-linked-list'
import { shuffle } from '~/util/shuffle'
import { Stack } from '~/util/stack'
import { Card, CardColor, deck, getColor } from './card'
import { Command } from './command'
import { PlayerIdAlreadyExists, NotEnoughPlayers, TooManyPlayers, GameAlreadyStarted } from './exceptions'

class Player {

    unu: boolean = false

    // TODO: implement hand class to wrap class (and make it easier to swap/rotate hands)
    private hand: Card[] = []

    constructor(public id: string) { }

    addCard(card: Card): void {
        this.hand.push(card)
    }

    getCard(index: number): Card {
        return this.hand.splice(index, 1)[0]
    }
}

export class GameState {

    private players: CircularDoubleLinkedList<Player> = new CircularDoubleLinkedList()
    private playedCards: Stack<Card>
    private remainingCards: Stack<Card>
    private started: boolean = false
    private currentColor?: CardColor

    process(command: Command) {
        const type = command.type
        switch (type) {
            case "add-player":
                if (this.started) {
                    throw new GameAlreadyStarted()
                }

                if (this.players.size() >= 10) {
                    throw new TooManyPlayers()
                }

                const playerId = command.playerId

                if (this.players.findFirst(player => player.id === playerId)) {
                    throw new PlayerIdAlreadyExists(playerId)
                }

                this.players.submit(new Player(playerId))

                break
            case "start":
                if (this.players.size() < 2) {
                    throw new NotEnoughPlayers()
                }

                const stack = new Stack<Card>(shuffle(deck()))

                const cardsToDistribute = this.players.size() * 7

                for (let i = 0; i < cardsToDistribute; i++) {
                    const card = stack.pop()
                    if (card) {
                        this.players.head()?.addCard(card)
                    }
                }

                this.playedCards = new Stack<Card>()
                const firstCard = stack.pop()
                if (firstCard) {
                    this.playedCards.push(firstCard)
                    this.currentColor = getColor(firstCard)
                }

                this.remainingCards = stack

                this.started = true

                break
            case "draw":
                console.log("Command 'draw' not implemented") // TODO
                break
            case "play":
                console.log("Command 'play' not implemented") // TODO
                break
            case "unu":
                console.log("Command 'unu' not implemented") // TODO
                break
            default:
                console.error(`Command '${type}' unknown`) // TODO
        }
    }
}