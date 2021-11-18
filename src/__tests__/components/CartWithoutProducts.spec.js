import React from "react"
import { render, screen } from '@testing-library/react'
import CartWithoutProducts from "../../components/CartWithoutProducts"

describe("Cart without products component", () => {
    test("should be able to render an button", () => {
        render(
            <CartWithoutProducts />
        )

        expect(screen.getAllByText("Voltar às compras")).toBeTruthy()
    })
})