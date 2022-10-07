import { GameStatus } from "./game";

export class PlayerIdAlreadyExists {
 
    constructor(public id: string) { }
}

export class NotEnoughPlayers {

}

export class TooManyPlayers {

}

export class InvalidGameStatus {

    constructor(public expected: GameStatus, public actual: GameStatus) {

    }
}

export class NotYourTurn {

}

export class Impossible {

}
