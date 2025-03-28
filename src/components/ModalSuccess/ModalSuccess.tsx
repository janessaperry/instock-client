// Components
import Button from "../Button/Button";
import { CloseIcon } from "../Icons/Icons";

// Styles
import "./ModalSuccess.scss";

interface ModalSuccessProps {
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDone: () => void;
}

function ModalSuccess({
  showSuccessModal,
  setShowSuccessModal,
  onDone,
}: ModalSuccessProps) {
  const handleDone = () => {
    setShowSuccessModal(false);
    onDone();
  };

  return (
    <div className="modal">
      <div className="modal__content-wrapper">
        <div
          className={`modal__progress ${
            showSuccessModal ? "modal__progress--animate" : ""
          }`}
          onAnimationEnd={handleDone}
        ></div>
        <div className="modal__content">
          <header className="modal__header">
            <h2 className="modal__title">Success!</h2>
            <Button
              icon={<CloseIcon />}
              className="btn--icon modal__close-btn"
              handleClick={handleDone}
            />
          </header>

          <section className="modal__body">
            <p className="modal__message modal__message--success">
              Warehouse / Inventory successfully updated / saved!
            </p>
          </section>

          <footer className="modal__footer">
            <Button
              className="btn btn--primary"
              label="Done"
              handleClick={handleDone}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccess;
