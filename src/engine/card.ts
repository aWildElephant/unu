enum CardNumber {
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
    BLUE,
    GREEN,
    RED,
    YELLOW
}

export type Card = { type: "number", num: CardNumber, color: CardColor }
    | { type: "joker" }
    | { type: "draw-2", color: CardColor }
    | { type: "draw-4" }
    | { type: "swap", color: CardColor }
    | { type: "choose-color" }
    | { type: "skip-next-player", color: CardColor }
    | { type: "rotate-hands" }
    | { type: "change-direction", color: CardColor }

/**
 * Build all cards for a specific color
 *
 * @param color the color of the cards
 * @returns one card numbered 0, two card for number 1 to 9
 */
function coloredCards(color: CardColor): Card[] {
    const cards: Card[] = []

    cards.push({
        type: "number",
        num: CardNumber.ZERO,
        color
    })

    for (let i = CardNumber.ONE; i <= CardNumber.NINE; i++) {
        const card: Card = {
            type: "number",
            num: i,
            color
        }

        cards.push(card)
        cards.push(card)
    }

    const plus2Card: Card = {
        type: "draw-2",
        color
    }

    cards.push(plus2Card)
    cards.push(plus2Card)

    const skipNextPlayerCard: Card = {
        type: "skip-next-player",
        color
    }

    cards.push(skipNextPlayerCard)
    cards.push(skipNextPlayerCard)

    const changeDirectionCard: Card = {
        type: "change-direction",
        color
    }

    cards.push(changeDirectionCard)
    cards.push(changeDirectionCard)

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

    const jokerCard: Card = {
        type: "joker"
    }

    deck.push(jokerCard)
    deck.push(jokerCard)
    deck.push(jokerCard)
    deck.push(jokerCard)

    const draw4Card: Card = {
        type: "draw-4"
    }

    deck.push(draw4Card)
    deck.push(draw4Card)
    deck.push(draw4Card)
    deck.push(draw4Card)

    const rotateHandsCard: Card = {
        type: "rotate-hands"
    }

    deck.push(rotateHandsCard)
    deck.push(rotateHandsCard)
    deck.push(rotateHandsCard)
    deck.push(rotateHandsCard)

    return deck
}

export function getColor(card: Card): CardColor | undefined {
    switch (card.type) {
        case "number":
        case "draw-2":
        case "swap":
        case "skip-next-player":
        case "change-direction":
            return card.color
        default:
            return undefined
    }
}