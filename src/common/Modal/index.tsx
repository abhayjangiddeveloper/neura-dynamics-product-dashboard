import { Icons } from "@/utils/iconPath";
import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";

interface ModalProps {
  isOpen?: boolean;
  onClose: (e?: any) => void;
  title?: string;
  contentClassName?: string;
  className?: string;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title = "Modal Heading",
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("hideBackgroundScroll");
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("hideBackgroundScroll");
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.classList.remove("hideBackgroundScroll");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      onClick={(e) => {
        e?.stopPropagation();
      }}
    >
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className={"modalBox"} onClick={onClose}>
          <img
            className="close clickable unselectable"
            src={Icons.CLOSE}
            alt="close"
          />
        </div>
        <div className="content">
          <div className="heading heading2">{title}</div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal") || document.createElement("div")
  );
};

export default Modal;
