import { useModal } from "../../providers/modal"
import { DetailsDiv } from "./styles"
import { IoClose } from "react-icons/io5"

const ModalDetails = () => {
    const { detailedProduct, handleCloseModal } = useModal()

    return (
        <DetailsDiv>
            <header>
                <h1>Detalhes Técnicos</h1>
                <div onClick={handleCloseModal} id="closeIcon">
                    <IoClose />
                </div>
            </header>

            <div id="detailsContent" >
            </div>

        </DetailsDiv>
    )
}

export default ModalDetails