import React from "react"
import { render, screen } from '@testing-library/react'
import Header from "../../components/Header"
import { AuthProvider } from "../../providers/auth"
import { ModalProvider } from "../../providers/modal"

describe("Header button", () => {
    test("should be able to render an button", () => {
        render(
            <AuthProvider >
                <ModalProvider>
                    <Header buttonOut1="Login" buttonOut2="Register" />
                </ModalProvider>
            </AuthProvider>
        )
        expect(screen.getByText("Login")).toBeTruthy()
        expect(screen.getByText("Register")).toBeTruthy()
    })
})