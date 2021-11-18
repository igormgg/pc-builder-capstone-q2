import React from "react"
import { render } from '@testing-library/react'
import { ModalProvider } from "../../providers/modal"
import ModalDetails from "../../components/ModalDetails"

describe("Modal contacts components", () => {
    test("should be able to render the close button", () => {
        render(
            <ModalProvider>
                <ModalDetails />
            </ModalProvider>
        )

        const { container } = render(
            <ModalProvider>
                <ModalDetails />
            </ModalProvider>
        )

        expect(container.querySelector("path")).toBeTruthy()
        expect(container.querySelector("svg")).toBeTruthy()
    })
})