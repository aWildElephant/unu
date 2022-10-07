import { CircularDoubleLinkedList } from '~/util/circular-double-linked-list'
import { Stack } from '~/util/stack'
import { Card } from './card'
import { Impossible } from './exceptions'

class Hand {

    private hand: Card[] = []

    addCard(card: Card): void {
        this.hand.push(card)
    }

    getCard(index: number): Card {
        return this.hand.splice(index, 1)[0]
    }
}

export class Player {

    unu: boolean = false

    hand = new Hand()

    constructor(public id: string) { }
}

export enum GameStatus {
    WAITING,
    IN_PROGRESS,
    DONE
}

export class GameState {

    players: CircularDoubleLinkedList<Player> = new CircularDoubleLinkedList()
    playedCards: Stack<Card>
    remainingCards: Stack<Card>

    status: GameStatus = GameStatus.WAITING

    numberOfPlayers(): number {
        return this.players.size()
    }

    playerExists(id: string): boolean {
        return this.players.findFirst(player => player.id === id) !== undefined
    }

    playerIds(): string[] {
        return this.players.backingArray.map(player => player.id)
    }

    currentPlayer(): Player {
        const player = this.players.head()

        if (!player) {
            throw new Impossible()
        }

        return player
    }

    repurposePlayedCards(): void {
        let card
        while ((card = this.playedCards.pop()) != undefined) {
            this.remainingCards.push(card)
        }
    }
}