import React from "react"
import { render, screen } from '@testing-library/react'
import { AuthProvider } from "../../providers/auth"
import Build from "../../pages/Build"
import { BuildProvider } from "../../providers/build"
import { ModalProvider } from "../../providers/modal"

describe("Build pages buttons", () => {
    test("should be able to render the buttons", () => {
        render(
            <ModalProvider>
                <AuthProvider>
                    <BuildProvider >
                        <Build />
                    </BuildProvider>
                </AuthProvider>
            </ModalProvider>
        )
        expect(screen.getAllByText("Adicionar")[0]).toBeTruthy()
        expect(screen.getByText("Finalizar montagem")).toBeTruthy()
    })
})