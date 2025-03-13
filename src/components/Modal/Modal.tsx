import { DeletedWarehouseProps } from "../../types";
import Button from "../Button/Button";
import { CloseIcon } from "../Icons/Icons";
import "./Modal.scss";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedWarehouse: React.Dispatch<
    React.SetStateAction<DeletedWarehouseProps | null>
  >;
  handleDelete: Function;
  warehouseToDelete: DeletedWarehouseProps | null;
}

function Modal({
  setShowModal,
  handleDelete,
  setDeletedWarehouse,
  warehouseToDelete,
}: ModalProps) {
  console.log(warehouseToDelete);
  return (
    <div className="modal">
      <div className="modal__content">
        <Button
          icon={<CloseIcon />}
          className="btn--icon modal__close-btn"
          handleClick={() => setShowModal(false)}
        />

        <h2 className="modal__title">
          Delete {warehouseToDelete?.warehouseName} Warehouse?
        </h2>

        <p className="modal__body">
          Please confirm that you'd like to delete the{" "}
          {warehouseToDelete?.warehouseName} from the list of warehouses. You
          won't be able to undo this action.
        </p>

        <div className="modal__actions">
          <Button
            label="Cancel"
            className="btn--secondary"
            handleClick={() => {
              setShowModal(false);
              setDeletedWarehouse(null);
            }}
          />
          <Button
            label="Delete"
            className="btn--warning"
            handleClick={() => {
              handleDelete(warehouseToDelete?.warehouseId);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
