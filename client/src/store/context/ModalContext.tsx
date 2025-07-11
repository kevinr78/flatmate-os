// src/context/ModalContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";
import Modal from "../../components/ui/Modal";

interface ModalContextType {
  openModal: (component: ReactNode, title?: string, size?: ModalSize) => void;
  closeModal: () => void;
}

type ModalSize = "sm" | "md" | "lg" | "xl";

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<ModalSize>("md");

  const openModal = (
    component: ReactNode,
    title?: string,
    modalSize: ModalSize = "md"
  ) => {
    setModalContent(component);
    setModalTitle(title);
    setSize(modalSize);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle(undefined);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalTitle}
        size={size}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};
