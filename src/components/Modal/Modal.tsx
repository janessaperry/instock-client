import Button from "../Button/Button";
import "./Modal.scss";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedId: React.Dispatch<React.SetStateAction<number | null>>;
  handleDelete: Function;
  idToDelete: number | null;
}

function Modal({
  setShowModal,
  handleDelete,
  setDeletedId,
  idToDelete,
}: ModalProps) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Modal Title</h2>
        <p className="modal__body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
          reprehenderit adipisci tempora molestiae et ullam, doloremque iste
          expedita omnis dolor, doloribus atque rerum ea ipsum quisquam aperiam
          enim magnam illo?
        </p>
        <div className="modal__actions">
          <Button
            label="Cancel"
            btnClasses="btn--secondary"
            handleClick={() => {
              setShowModal(false);
              setDeletedId(null);
            }}
          />
          <Button
            label="Delete"
            btnClasses="btn--warning"
            handleClick={() => {
              handleDelete(idToDelete);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
