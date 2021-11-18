import React from "react"
import { render, screen } from '@testing-library/react'
import Sign from "../../pages/Sign"
import { AuthProvider } from "../../providers/auth"
import { ModalProvider } from "../../providers/modal"

describe("Sign inputs", () => {
    test("should be able to render the inputs", () => {
        render(
            <AuthProvider>
                <ModalProvider>
                    <Sign />
                </ModalProvider>
            </AuthProvider>
        )
        expect(screen.getByPlaceholderText("Nome")).toBeTruthy()
        expect(screen.getAllByPlaceholderText("Email")[0]).toBeTruthy()
        expect(screen.getAllByPlaceholderText("Email")[1]).toBeTruthy()
        expect(screen.getAllByPlaceholderText("Email")[0]).toBeTruthy()
        expect(screen.getByPlaceholderText("Confirmar Senha")).toBeTruthy()
    })
})