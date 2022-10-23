import { Hand } from "./hand"

export class Player {

    unu = false

    hand = new Hand()

    constructor(public id: string) { }
}

export class Players {

    players = new Map<string, Player>()
    order: string[] = []
    currentIndex: number = 0

    getCurrent(): Player | undefined {
        return this.get(this.order[this.currentIndex])
    }

    setCurrent(id: string): void {
        if (!this.exists(id)) {
            throw new Error()
        }
        this.currentIndex = this.order.indexOf(id)
    }

    getOrder(): string[] {
        return [...this.order]
    }

    reverseOrder(): void {
        this.order.reverse()
        this.currentIndex = this.order.length - 1 - this.currentIndex
    }

    getNext(): Player | undefined {
        const nextIndex = this.currentIndex < this.order.length - 1 ? this.currentIndex + 1 : 0
        return this.get(this.order[nextIndex])
    }

    exists(id: string): boolean {
        return this.players.has(id)
    }

    get(id: string): Player | undefined {
        return this.players.get(id)
    }

    count(): number {
        return this.players.size
    }

    add(player: Player): void {
        const playerId = player.id
        this.players.set(playerId, player)
        this.order.push(playerId)
    }
}