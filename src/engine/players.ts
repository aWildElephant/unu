import { Hand } from "./hand"

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