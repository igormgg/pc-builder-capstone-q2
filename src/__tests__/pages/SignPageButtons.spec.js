import React from "react"
import { render, screen } from '@testing-library/react'
import Sign from "../../pages/Sign"
import { AuthProvider } from "../../providers/auth"
import { ModalProvider } from "../../providers/modal"

describe("Sign buttons", () => {
    test("should be able to render the buttons", () => {
        render(
            <AuthProvider>
                <ModalProvider>
                    <Sign />
                </ModalProvider>
            </AuthProvider>
        )
        expect(screen.getByText("Entrar")).toBeTruthy()
        expect(screen.getByText("Cadastrar")).toBeTruthy()
    })
})