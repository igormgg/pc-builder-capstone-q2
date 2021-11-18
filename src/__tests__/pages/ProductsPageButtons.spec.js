import React from "react"
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider } from "../../providers/auth"
import { ModalProvider } from "../../providers/modal"
import Products from "../../pages/Products"

describe("Products page buttons", () => {
    test("should be able to render the buttons", async () => {
        render(
            <AuthProvider >
                <ModalProvider>
                    <Products />
                </ModalProvider>
            </AuthProvider>
        )

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Pesquisar")).toBeTruthy()
            expect(screen.getAllByText("Monte seu PC")).toBeTruthy()
            expect(screen.getByText("Todos")).toBeTruthy()
        })

    })
})