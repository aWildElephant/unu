import { Card } from "./card"

export type Event = { type: "player-added", playerId: string } // TODO: add player position
    | { type: "played-cards-repurposed" }
    | { type: "card-drawn", playerId: string }
    | { type: "card-added-to-deck", card: Card }
    | { type: "first-card-set" }
