import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [detailedProduct, setDetailedProduct] = useState({});

  const [contactsOpen, setContactsOpen] = useState(false);

  const handleCloseModal = (e) => {
    if (
      e.target.id === "modalContainer" ||
      e.target.tagName === "svg" ||
      e.target.tagName === "path"
    ) {
      setIsOpen(false);
    }
  };

  const handleOpenModal = (item) => {
    setIsOpen(true);
    setDetailedProduct(item);
  };

  const handleCloseContactsModal = (e) => {
    if (
      e.target.id === "ModalContactsContainer" ||
      e.target.tagName === "svg" ||
      e.target.tagName === "path"
    ) {
      setContactsOpen(false);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        contactsOpen,
        detailedProduct,
        handleOpenModal,
        handleCloseContactsModal,
        handleCloseModal,
        setContactsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
