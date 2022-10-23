import { describe, it } from "mocha";
import { expect } from "chai"
import { Player, Players } from "~/engine/players";

describe('Players', function () {

    describe('Current player', function () {

        it('should be the first added player by default', function () {
            const players = new Players()

            players.add(new Player("p1"))
            players.add(new Player("p2"))

            expect(players.getCurrent()?.id).to.equal("p1")
        })

        it('can be changed', function () {
            const players = new Players()

            players.add(new Player("p1"))
            players.add(new Player("p2"))

            players.setCurrent("p2")

            expect(players.getCurrent()?.id).to.equal("p2")
        })
    })

    describe('Next player', function() {

        it('should be next player in the order', function () {
            const players = new Players()
    
            players.add(new Player("p1"))
            players.add(new Player("p2"))
    
            expect(players.getNext()?.id).to.equal("p2")
        })

        it('should loop back at the end of the order', function () {
            const players = new Players()
    
            players.add(new Player("p1"))
            players.add(new Player("p2"))

            players.setCurrent("p2")
    
            expect(players.getNext()?.id).to.equal("p1")
        })
    })

    describe('Reverse order', function () {

        it('should do pretty much what it name implies', function () {
            const players = new Players()
    
            players.add(new Player("p1"))
            players.add(new Player("p2"))
            players.add(new Player("p3"))

            players.reverseOrder()
    
            expect(players.getNext()?.id).to.equal("p3")
        })
    })
})
