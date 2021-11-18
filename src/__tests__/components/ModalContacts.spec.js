import React from "react"
import { render, screen } from '@testing-library/react'
import ModalContacts from "../../components/ModalContacts"
import { ModalProvider } from "../../providers/modal"

describe("Modal contacts components", () => {
    test("should be able to render the close button", () => {
        render(
            <ModalProvider>
                <ModalContacts />
            </ModalProvider>
        )

        const { container } = render(
            <ModalProvider>
                <ModalContacts />
            </ModalProvider>
        )

        expect(container.querySelector("path")).toBeTruthy()
        expect(container.querySelector("svg")).toBeTruthy()
    })
})