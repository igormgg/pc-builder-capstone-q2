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
                    <Header />
                </ModalProvider>
            </AuthProvider>
        )
        expect(screen.getByText("PC Builder")).toBeTruthy()
    })
})