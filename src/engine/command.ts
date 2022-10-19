import { Card } from "./card";

export type Command = { type: "add-player", playerId: string }
    | { type: "start" }
    | { type: "play", playerId: string, card: Card }
    | { type: "draw", playerId: string }
    | { type: "skip", playerId: string }
    | { type: "unu", playerId: string }
