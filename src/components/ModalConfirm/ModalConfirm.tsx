// Componets
import Button from "../Button/Button";
import { CloseIcon } from "../Icons/Icons";
import { DeletedRecordProps } from "../../types";

// Styles
import "./ModalConfirm.scss";

interface ModalConfirmProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleted: React.Dispatch<React.SetStateAction<DeletedRecordProps | null>>;
  handleDelete: Function;
  dataToDelete: DeletedRecordProps | null;
  type: string;
}

function ModalConfirm({
  setShowModal,
  setDeleted,
  handleDelete,
  dataToDelete,
  type,
}: ModalConfirmProps) {
  const generateBodyMessage = () => {
    return type === "warehouse"
      ? `Please confirm that you'd like to delete the ${dataToDelete?.name} warehouse from the list of warehouses. You won't be able to undo this action.`
      : `Please confirm that you'd like to delete ${dataToDelete?.name} from the inventory list. You won't be able to undo this action.`;
  };
  return (
    <div className="modal modal--confirm">
      <div className="modal__content-wrapper">
        <div className="modal__content">
          <header className="modal__header">
            <h2 className="modal__title">
              Delete {dataToDelete?.name}{" "}
              {type === "warehouse" ? "Warehouse" : "inventory item"}?
            </h2>{" "}
            <Button
              icon={<CloseIcon />}
              className="btn--icon modal__close-btn"
              handleClick={() => setShowModal(false)}
            />
          </header>

          <section className="modal__body">
            <p className="modal__message">{generateBodyMessage()}</p>
          </section>

          <footer className="modal__footer">
            <Button
              label="Cancel"
              className="btn--secondary"
              handleClick={() => {
                setShowModal(false);
                setDeleted(null);
              }}
            />
            <Button
              label="Delete"
              className="btn--warning"
              handleClick={() => {
                handleDelete(dataToDelete?.id);
              }}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
