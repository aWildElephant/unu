export enum CardNumber {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGhT = 8,
    NINE = 9
}

export enum CardColor {
    BLUE = "blue",
    GREEN = "green",
    RED = "red",
    YELLOW = "yellow"
}

export interface Card {

    name(): string
}

export class Draw4Card implements Card {

    name(): string {
        return "draw 4 card"
    }
}

export class JokerCard implements Card {

    name(): string {
        return "joker card"
    }
}

export class RotateCard implements Card {

    name(): string {
        return "rotate card"
    }
}

export abstract class ColoredCard implements Card {

    constructor(public color: CardColor) {

    }

    abstract name(): string
}

export class NumberCard extends ColoredCard {

    constructor(public num: CardNumber, color: CardColor) {
        super(color)
    }

    name(): string {
        return `${this.color} ${this.num} card`
    }
}

export class Draw2Card extends ColoredCard {

    constructor(color: CardColor) {
        super(color)
    }

    name(): string {
        return `${this.color} draw 2 card`
    }
}

export class SkipNextPlayerCard extends ColoredCard {

    constructor(color: CardColor) {
        super(color)
    }

    name(): string {
        return `${this.color} skip next card`
    }
}

export class ChangeDirectionCard extends ColoredCard {

    constructor(color: CardColor) {
        super(color)
    }

    name(): string {
        return `${this.color} change direction card`
    }
}

/**
 * Build all cards for a specific color
 *
 * @param color the color of the cards
 * @returns one card numbered 0, two card for number 1 to 9
 */
function coloredCards(color: CardColor): Card[] {
    const cards: Card[] = []

    cards.push(new NumberCard(CardNumber.ZERO, color))

    for (let i = CardNumber.ONE; i <= CardNumber.NINE; i++) {
        cards.push(new NumberCard(i, color))
        cards.push(new NumberCard(i, color))
    }

    cards.push(new Draw2Card(color))
    cards.push(new Draw2Card(color))

    cards.push(new SkipNextPlayerCard(color))
    cards.push(new SkipNextPlayerCard(color))

    cards.push(new ChangeDirectionCard(color))
    cards.push(new ChangeDirectionCard(color))

    return cards
}

/**
 * Build a deck of UNU
 *
 * @returns all cards in a specific order. Must be shuffled before use
 */
export function deck(): Card[] {
    let deck: Card[] = []

    deck = deck.concat(coloredCards(CardColor.BLUE))
    deck = deck.concat(coloredCards(CardColor.GREEN))
    deck = deck.concat(coloredCards(CardColor.RED))
    deck = deck.concat(coloredCards(CardColor.YELLOW))

    deck.push(new JokerCard())
    deck.push(new JokerCard())
    deck.push(new JokerCard())
    deck.push(new JokerCard())

    deck.push(new Draw4Card())
    deck.push(new Draw4Card())
    deck.push(new Draw4Card())
    deck.push(new Draw4Card())

    deck.push(new RotateCard())
    deck.push(new RotateCard())
    deck.push(new RotateCard())
    deck.push(new RotateCard())

    return deck
}

export function getColor(card: Card): CardColor | undefined {
    if (card instanceof ColoredCard) {
        return card.color
    } else {
        return undefined
    }
}