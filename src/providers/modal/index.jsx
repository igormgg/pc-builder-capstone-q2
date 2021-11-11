import { createContext, useContext, useState } from "react"

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const [detailedProduct, setDetailedProduct] = useState({})

    const handleCloseModal = (e) => {
        if (e.target.tagName === "svg") {
            setIsOpen(false)
        }
    }

    const handleOpenModal = (item) => {
        setIsOpen(true)
        setDetailedProduct(item)
    }

    return (
        <ModalContext.Provider
            value={{ isOpen, detailedProduct, handleOpenModal, handleCloseModal }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)