import { Stack } from '~/util/stack'
import { Card } from './card'
import { Player, Players } from './players'

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
        return this.players.getOrder()
    }

    currentPlayer(): Player | undefined {
        return this.players.getCurrent()
    }

    repurposePlayedCards(): void {
        let card
        while ((card = this.playedCards.pop()) != undefined) {
            this.remainingCards.push(card)
        }
    }
}