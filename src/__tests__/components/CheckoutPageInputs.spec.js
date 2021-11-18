import React from "react"
import { render, screen } from '@testing-library/react'
import { AuthProvider } from "../../providers/auth"
import { Checkout } from "../../pages/Checkout"

describe("Products page buttons", () => {
    test("should be able to render the buttons", () => {
        render(
            <AuthProvider >
                <Checkout />
            </AuthProvider>
        )

        expect(screen.getByPlaceholderText("Pesquisar")).toBeTruthy()
        expect(screen.getAllByText("Monte seu PC")).toBeTruthy()
        expect(screen.getByText("Todos")).toBeTruthy()
    })
})