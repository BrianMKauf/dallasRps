const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")
const PlayForm = require("../src/components/PlayForm")

describe("play form", function () {
    describe("when the game module determines the throws are invalid", function () {
        beforeEach(function () {
            let requests = {
                playRound(p1Throw, p2Throw, ui){ ui.invalid() }
            }

            render(requests)
        })

        it("displays 'INVALID'", function () {
            expect(page()).not.toContain("INVALID")
            submitForm()
            expect(page()).toContain("INVALID")
        })
    })
    
    describe("when the game module determines the throws are tie", function () {
        beforeEach(function () {
            let requests = {
                playRound(p1Throw, p2Throw, ui){ ui.tie() }
            }

            render(requests)
        })

        it("displays 'TIE'", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })
    })
    
    describe("when the game module determines the throws are p1Wins", function () {
        beforeEach(function () {
            let requests = {
                playRound(p1Throw, p2Throw, ui){ ui.p1Wins() }
            }

            render(requests)
        })

        it("displays 'P1 Wins!'", function () {
            expect(page()).not.toContain("P1 Wins!")
            submitForm()
            expect(page()).toContain("P1 Wins!")
        })
    })

    describe("when the game module determines the throws are p2Wins", function () {
        beforeEach(function () {
            let requests = {
                playRound(p1Throw, p2Throw, ui){ ui.p2Wins() }
            }

            render(requests)
        })

        it("displays 'P2 Wins!'", function () {
            expect(page()).not.toContain("P2 Wins!")
            submitForm()
            expect(page()).toContain("P2 Wins!")
        })
    })

    it("sends the user input to the game module", function () {
        let playRoundSpy = jasmine.createSpy()

        render({playRound: playRoundSpy})

        fillIn("p1Throw", "rock");
        fillIn("p2Throw", "scissors");

        submitForm()

        expect(playRoundSpy).toHaveBeenCalledWith("rock", "scissors", jasmine.any(Object))
    })

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }

    function submitForm() {
        document.querySelector("button").click()
    }

    function render(requests) {
        renderComponent(<PlayForm requests={requests}/>)
    }
})








