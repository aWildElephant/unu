import { Card } from "./card"

export type Event = { type: "player-added", playerId: string } // TODO: add player position
    | { type: "played-cards-repurposed" }
    | { type: "card-drawn", playerId: string }
    | { type: "card-added-to-deck", card: Card }
    | { type: "card-added-to-hand", card: Card, playerId: string }
    | { type: "card-played", card: Card }
    | { type: "card-removed-from-hand", playerId: string, card: Card }
