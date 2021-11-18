import React from "react"
import { render, screen } from '@testing-library/react'
import { Button } from "../../components/Button"

describe("Button component", () => {
    test("should be able to render an button", () => {
        render(
            <Button>Botão</Button>
        )

        expect(screen.getAllByText("Botão")).toBeTruthy()
    })
})