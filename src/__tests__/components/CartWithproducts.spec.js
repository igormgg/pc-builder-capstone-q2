import React from "react"
import { render, screen } from '@testing-library/react'
import CartWithProducts from "../../components/CartWithProducts"
import { ModalProvider } from "../../providers/modal"
import { AuthProvider } from "../../providers/auth"
import { CartProvider } from "../../providers/cart"
describe("Cart with products component", () => {
    test("should be able to render an button", () => {
        render(
            <ModalProvider>
                <AuthProvider>
                    <CartProvider>
                        <CartWithProducts />
                    </CartProvider>
                </AuthProvider>
            </ModalProvider>
        )

        expect(screen.getAllByText("Checkout")).toBeTruthy()
    })
})