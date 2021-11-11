import { useModal } from "../../providers/modal"
import { ModalContainer } from "./style"

const Modal = ({ children }) => {
    const { handleCloseModal } = useModal()

    return (
        <>
            <ModalContainer onClick={handleCloseModal} id="modalContainer">
                <div id="modalDiv">{children}</div>
            </ModalContainer>
        </>
    )
}

export default Modal