// Libraries
import { useEffect } from "react";

// Components
import Button from "../Button/Button";
import { CloseIcon } from "../Icons/Icons";

// Styles
import "./ModalSuccess.scss";

interface ModalSuccessProps {
  type: "warehouse" | "inventory item";
  nameValue: string;
  editMode: boolean;
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDone: () => void;
}

function ModalSuccess({
  type,
  nameValue,
  editMode,
  showSuccessModal,
  setShowSuccessModal,
  onDone,
}: ModalSuccessProps) {
  const handleClose = () => {
    setShowSuccessModal(false);
    onDone();
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="modal">
      <div className="modal__content-wrapper">
        <div
          className={`modal__progress ${
            showSuccessModal ? "modal__progress--animate" : ""
          }`}
          onAnimationEnd={handleClose}
        ></div>
        <div className="modal__content">
          <header className="modal__header">
            <h2 className="modal__title">Success!</h2>
            <Button
              icon={<CloseIcon />}
              className="btn--icon modal__close-btn"
              handleClick={handleClose}
            />
          </header>

          <section className="modal__body">
            <p className="modal__message modal__message--success">
              {`${nameValue} ${type} successfully ${
                editMode ? "updated" : "created"
              }!`}
            </p>
          </section>

          <footer className="modal__footer">
            <Button
              className="btn btn--primary"
              label="Done"
              handleClick={handleClose}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccess;
