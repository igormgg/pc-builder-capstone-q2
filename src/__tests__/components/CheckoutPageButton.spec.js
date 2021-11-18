import React from "react"
import { render, screen } from '@testing-library/react'
import { AuthProvider } from "../../providers/auth"
import { Checkout } from "../../pages/Checkout"
import UserProvider from "../../providers/userData"
import { ModalProvider } from "../../providers/modal"
import { BrowserRouter } from "react-router-dom"

describe("Checkout page button", () => {
    test("should be able to render the button", () => {
        render(
            <AuthProvider >
                <UserProvider>
                    <ModalProvider>
                        <BrowserRouter>
                            <Checkout />
                        </BrowserRouter>
                    </ModalProvider>
                </UserProvider>
            </AuthProvider>
        )

        expect(screen.getByText("Voltar aos produtos")).toBeTruthy()
    })
})