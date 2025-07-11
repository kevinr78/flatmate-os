// src/components/ui/Modal.tsx

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) => {
  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-100 backdrop-blur-xs">
      <div className={`bg-base-100 rounded-lg shadow-lg w-full ${sizeClass}`}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-bold">{title || "Modal"}</h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
