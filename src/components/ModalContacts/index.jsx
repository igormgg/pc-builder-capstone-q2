import { useModal } from "../../providers/modal";
import { ModalContactsContainer } from "./styles";

const ModalContacts = () => {
  const { handleCloseContactsModal } = useModal();

  return (
    <ModalContactsContainer
      onClick={handleCloseContactsModal}
      id="ModalContactsContainer"
    >
      <h1>Teste</h1>
    </ModalContactsContainer>
  );
};

export default ModalContacts;
