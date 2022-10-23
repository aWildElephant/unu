
import { describe, it } from "mocha";
import { expect } from "chai"

import { Application } from "~/engine/application";
import { Command } from "~/engine/command"
import { Event } from "~/engine/event";

function addPlayerCommand(id: string): Command {
    return {
        type: "add-player",
        playerId: id
    }
}

function playerAddedEvent(id: string): Event {
    return {
        type: "player-added",
        playerId: id
    }
}

describe('Processing of commands: add-player', function () {

    it('should add the first player', function () {
        const app = new Application()

        const command = addPlayerCommand("p1")

        const expected = [playerAddedEvent("p1")]

        expect(app.process(command)).to.deep.equal(expected)
    })

    it('should add a second player', function () {
        const app = new Application()
        app.apply(playerAddedEvent("p1"))

        const command = addPlayerCommand("p2")

        const expected = [playerAddedEvent("p2")]

        expect(app.process(command)).to.deep.equal(expected)
    })

    it('should not add a player if the id already exists', function () {
        const app = new Application()
        app.apply(playerAddedEvent("p1"))

        const command = addPlayerCommand("p1")

        // TODO: asset the exact type of the exception, couldn't get it to work
        expect(() => app.process(command)).to.throw()
    })

    it('should not add a player if there are already 10', function () {
        const app = new Application()
        app.apply(playerAddedEvent("p01"))
        app.apply(playerAddedEvent("p02"))
        app.apply(playerAddedEvent("p03"))
        app.apply(playerAddedEvent("p04"))
        app.apply(playerAddedEvent("p05"))
        app.apply(playerAddedEvent("p06"))
        app.apply(playerAddedEvent("p07"))
        app.apply(playerAddedEvent("p08"))
        app.apply(playerAddedEvent("p09"))
        app.apply(playerAddedEvent("p10"))

        const command = addPlayerCommand("p11")

        // TODO: asset the exact type of the exception, couldn't get it to work
        expect(() => app.process(command)).to.throw()
    })
})
