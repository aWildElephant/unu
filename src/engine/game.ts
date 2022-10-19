import { Stack } from '~/util/stack'
import { Card } from './card'

const _ = require("lodash")

class Hand {

    private cards: Card[] = []

    add(card: Card): void {
        this.cards.push(card)
    }

    contains(card: Card): boolean {
        return !!_.find(this.cards, (c: Card) => _.isEqual(c, card))
    }

    remove(card: Card): void {
        this.cards = _.remove(this.cards, (c: Card) => _.isEqual(c, card))
    }
}

export class Player {

    unu = false

    hand = new Hand()

    constructor(public id: string) { }
}

export class Players {

    players: Player[] = []
    currentIndex = 0

    exists(id: string): boolean {
        return this.get(id) != null
    }

    get(id: string): Player | null {
        const match = this.players.filter(player => player.id === id)

        if (match.length > 0) {
            return match[0]
        } else {
            return null
        }
    }

    count(): number {
        return this.players.length
    }

    add(player: Player): void {
        if (this.get(player.id) == null) {
            this.players.push(player)
        }
    }
}

export enum GameStatus {
    WAITING,
    IN_PROGRESS,
    DONE
}

export class GameState {

    players = new Players()
    playedCards: Stack<Card> = new Stack()
    remainingCards: Stack<Card>

    status: GameStatus = GameStatus.WAITING

    playerCount(): number {
        return this.players.count()
    }

    playerExists(id: string): boolean {
        return this.players.exists(id)
    }

    playerIds(): string[] {
        return this.players.players.map(player => player.id)
    }

    currentPlayer(): Player {
        return this.players.players[0]
    }

    repurposePlayedCards(): void {
        let card
        while ((card = this.playedCards.pop()) != undefined) {
            this.remainingCards.push(card)
        }
    }
}