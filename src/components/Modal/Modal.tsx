import { DeletedRecordProps } from "../../types";
import Button from "../Button/Button";
import { CloseIcon } from "../Icons/Icons";
import "./Modal.scss";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleted: React.Dispatch<React.SetStateAction<DeletedRecordProps | null>>;
  handleDelete: Function;
  dataToDelete: DeletedRecordProps | null;
  type: string;
}

function Modal({
  setShowModal,
  setDeleted,
  handleDelete,
  dataToDelete,
  type,
}: ModalProps) {
  const generateBodyMessage = () => {
    return type === "warehouse"
      ? `Please confirm that you'd like to delete the ${dataToDelete?.name} warehouse from the list of warehouses. You won't be able to undo this action.`
      : `Please confirm that you'd like to delete ${dataToDelete?.name} from the inventory list. You won't be able to undo this action.`;
  };
  return (
    <div className="modal">
      <div className="modal__content">
        <Button
          icon={<CloseIcon />}
          className="btn--icon modal__close-btn"
          handleClick={() => setShowModal(false)}
        />

        <h2 className="modal__title">
          Delete {dataToDelete?.name}{" "}
          {type === "warehouse" ? "Warehouse" : "inventory item"}?
        </h2>

        <p className="modal__body">{generateBodyMessage()}</p>

        <div className="modal__actions">
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
        </div>
      </div>
    </div>
  );
}

export default Modal;
