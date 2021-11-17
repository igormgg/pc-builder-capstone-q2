import React from "react"
import { render, screen } from '@testing-library/react'
import { AuthProvider } from "../../providers/auth"
import { BuildProvider } from "../../providers/build"
import { ModalProvider } from "../../providers/modal"
import CategoryProducts from "../../pages/CategoryProducts"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        category: 'cpu',
    }),
}));

describe("Build pages buttons", () => {
    test("should be able to render the buttons", () => {
        render(
            <ModalProvider>
                <AuthProvider>
                    <BuildProvider >
                        <CategoryProducts />
                    </BuildProvider>
                </AuthProvider>
            </ModalProvider>
        )
        expect(screen.getAllByText("Adicionar")[0]).toBeTruthy()
    })
})