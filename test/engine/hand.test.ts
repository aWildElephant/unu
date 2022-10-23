import { describe, it } from "mocha";
import { expect } from "chai"

import { Hand } from "~/engine/hand"
import { CardColor, CardNumber, NumberCard } from "~/engine/card";

describe('Hand', function () {

    describe('contains', function () {

        it('should return true if the hand contains the given card', function () {
            const hand = new Hand()

            hand.add(new NumberCard(CardNumber.ZERO, CardColor.BLUE))

            expect(hand.contains(new NumberCard(CardNumber.ZERO, CardColor.BLUE))).to.be.true
        })

        it('should return false if the hand does not contain the given card', function () {
            const hand = new Hand()

            hand.add(new NumberCard(CardNumber.ZERO, CardColor.BLUE))

            expect(hand.contains(new NumberCard(CardNumber.ONE, CardColor.RED))).to.be.false
        })
    })

    describe('remove', function () {

        it('should remove only one instance of the card if several exist', function () {
            const hand = new Hand()

            hand.add(new NumberCard(CardNumber.ZERO, CardColor.BLUE))
            hand.add(new NumberCard(CardNumber.ZERO, CardColor.BLUE))

            hand.remove(new NumberCard(CardNumber.ZERO, CardColor.BLUE))

            expect(hand.size()).to.equal(1)
        })
    })
})
