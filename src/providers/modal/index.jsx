import { createContext, useContext, useState } from "react"

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleCloseModal = (e) => {
        if (e.target.tagName === "svg") {
            setIsOpen(false)
        }
    }

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    return (
        <ModalContext.Provider
            value={{ isOpen, handleOpenModal, handleCloseModal }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)