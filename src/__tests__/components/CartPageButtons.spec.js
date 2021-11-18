import React from "react"
import { render, screen } from '@testing-library/react'
import { AuthProvider } from "../../providers/auth"
import { ModalProvider } from "../../providers/modal"
import Cart from "../../pages/Cart"
import { BrowserRouter } from "react-router-dom"

describe("Cart buttons", () => {
    test("should be able to render the buttons", () => {
        render(
            <AuthProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <Cart />
                    </BrowserRouter>
                </ModalProvider>
            </AuthProvider>
        )
        expect(screen.getByText("Remover Todos")).toBeTruthy()
        expect(screen.getByText("Checkout")).toBeTruthy()
    })
})