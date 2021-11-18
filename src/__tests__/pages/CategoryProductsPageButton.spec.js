import React from "react"
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider } from "../../providers/auth"
import { BuildProvider } from "../../providers/build"
import { ModalProvider } from "../../providers/modal"
import CategoryProducts from "../../pages/CategoryProducts"
import { MemoryRouter, Route } from "react-router-dom";
import api from "../../services/api"
import MockAdapter from "axios-mock-adapter"

const apiMock = new MockAdapter(api)

describe("Category products page buttons", () => {
    test("should be able to render the button", async () => {
        window.scrollTo = jest.fn()
        apiMock.onGet("/products").replyOnce(200, {
            "cpu": [{
                "model": "Processador AMD Ryzen 5 3600, AM4, 3.6GHz",
                "img": "https://static.meupc.net/produto/processador-amd-ryzen-5-3600-100100000031box-jXdm89-L.jpg",
                "price": 1678.31,
                "description": [
                    "Marca: AMD",
                    "Modelo: Ryzen 5 3600",
                    "Cores: 6",
                    "Threads: 12",
                    "Socket: AM4",
                    "Base Clock: 3.6",
                    "Cooler Box: Incluso",
                    "GPU Integrada: Não",
                    "Consumo: 65 Watts"
                ]
            }]
        })
        render(
            <ModalProvider>
                <AuthProvider>
                    <BuildProvider >
                        <MemoryRouter initialEntries={["/build/cpu"]} >
                            <Route path="/build/:category" >
                                <CategoryProducts />
                            </Route>
                        </MemoryRouter>
                    </BuildProvider>
                </AuthProvider>
            </ModalProvider>
        )

        await waitFor(() => {
            expect(screen.getAllByText("Adicionar")[0]).toBeTruthy()
        })

    })
})