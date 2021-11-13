import { useModal } from "../../providers/modal"
import { DetailsDiv } from "./styles"
import { IoClose } from "react-icons/io5"

const ModalDetails = () => {
    const { detailedProduct, handleCloseModal } = useModal()

    const objIterator = () => {
        let output = []
        if (detailedProduct) {
            for (let key in detailedProduct) {
                if (key === "description") {
                    output = [...detailedProduct[key]]
                }
            }
        }
        return output
    }

    return (
        <DetailsDiv>
            <header>
                <h1>Detalhes Técnicos</h1>
                <div onClick={handleCloseModal} id="closeIcon">
                    <IoClose />
                </div>
            </header>

            <div id="detailsContent" >

                {objIterator() && objIterator().map((element, index) => {
                    const infos = element.split(":")
                    return (
                        <div className="infos" key={index}>
                            <h3>{infos[0]}:</h3>
                            <p>{infos[1]}</p>
                        </div>
                    )
                })}

            </div>

        </DetailsDiv>
    )
}

export default ModalDetails