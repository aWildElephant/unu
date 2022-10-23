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