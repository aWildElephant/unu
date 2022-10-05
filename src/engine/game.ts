import { CircularDoubleLinkedList } from '~/util/circular-double-linked-list'
import { Stack } from '../util/stack'
import { Card } from './card'
import { Command } from './command'
import { PlayerIdAlreadyExists } from './exceptions'

class Player {

    unu: boolean = false

    // TODO: implement hand class to wrap class (and make it easier to swap/rotate hands)
    private hand: Card[] = []

    constructor(public id: string) {}

    addCard(card: Card): void {
        this.hand.push(card)
    }

    getCard(index: number): Card {
        return this.hand.splice(index, 1)[0]
    }
}

export class GameState {

    private players: CircularDoubleLinkedList<Player> = new CircularDoubleLinkedList()
    private playedCards: Stack<Card> = new Stack()
    private remainingCards: Stack<Card> = new Stack()
    private started: boolean = false

    process(command: Command) {
        const type = command.type
        switch (type) {
            case "add-player":
                const playerId = command.playerId

                if (this.players.findFirst(player => player.id === playerId)) {
                    throw new PlayerIdAlreadyExists(playerId)
                }

                this.players.submit(new Player(playerId))

                break
            case "start":
                console.log("Command 'start' not implemented") // TODO
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