import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.modal} role="dialog">
      <div className={styles.overlay} onClick={onClose} role="button" />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
