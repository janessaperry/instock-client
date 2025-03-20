// Libraries
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Components
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import { ArrowBackIcon, EditIcon } from "../../components/Icons/Icons";

// Types
import {
  ListBodyActions,
  ListBodyChip,
  ListBodyLink,
  ListBodyText,
} from "../../components/ListBodyItem/ListBodyItem";
import { DeletedRecordProps } from "../../types";

// Styles
import "./WarehouseDetailsPage.scss";

interface WarehouseDetailsPageProps {
  baseApiUrl: string;
}

interface Warehouse {
  id: number;
  warehouse_name: string;
  address: string;
  city: string;
  country: string;
  contact_name: string;
  contact_position: string;
  contact_phone: string;
  contact_email: string;
}

interface Inventory {
  id: number;
  item_name: string;
  category: string;
  status: string;
  quantity: number;
}

function WarehouseDetailsPage({ baseApiUrl }: WarehouseDetailsPageProps) {
  const { warehouseId } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<DeletedRecordProps | null>(
    null
  );
  const [warehouse, setWarehouse] = useState<Warehouse>({} as Warehouse);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const navigate = useNavigate();

  const getWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/warehouses/${warehouseId}`
      );
      setWarehouse(response.data);
    } catch (error) {
      console.error(`Error fetching warehouse details: ${error}`);
    }
  };

  const getInventoryByWarehouse = async () => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/warehouses/${warehouseId}/inventories`
      );
      setInventory(response.data);
    } catch (error) {
      console.error(`Error fetching inventory by warehouse: ${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseApiUrl}/inventories/${deletedItem?.id}`);
      await getInventoryByWarehouse();
      setShowModal(false);
      setDeletedItem(null);
    } catch (error) {
      console.error(
        `Error deleting inventory item ${deletedItem?.id}: ${error}`
      );
    }
  };

  const handleModalOpen = (inventoryItem: Inventory) => {
    setShowModal(true);
    setDeletedItem({
      id: inventoryItem.id,
      name: inventoryItem.item_name,
    });
  };

  useEffect(() => {
    getWarehouseDetails();
    getInventoryByWarehouse();
  }, [warehouseId]);

  if (!Object.keys(warehouse).length) {
    return <Loading />;
  }

  return (
    <div className="warehouse-container">
      <ContainerHeader
        className="warehouse-header"
        title={warehouse.warehouse_name}
        prevBtn={
          <Button
            icon={<ArrowBackIcon />}
            className="btn--icon"
            handleClick={() => navigate(-1)}
          />
        }
        button={
          <Button
            label="Edit"
            icon={<EditIcon color="white" size="20" />}
            className="btn--primary btn--hide-label-mobile"
            handleClick={() => navigate(`/${warehouse.id}/edit`)}
          />
        }
      />

      <section className="warehouse-details">
        <div className="warehouse-details__info">
          <h4 className="warehouse-details__title">Warehouse Address:</h4>
          <p className="warehouse-details__content">
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </p>
        </div>

        <div className="warehouse-details__info-wrapper">
          <div className="warehouse-details__info">
            <h4 className="warehouse-details__title">Contact Name:</h4>
            <p className="warehouse-details__content">
              {warehouse.contact_name}
              <br />
              {warehouse.contact_position}
            </p>
          </div>
          <div className="warehouse-details__info">
            <h4 className="warehouse-details__title">Contact Information:</h4>
            <p className="warehouse-details__content">
              {warehouse.contact_phone}
              <br />
              {warehouse.contact_email}
            </p>
          </div>
        </div>
      </section>

      <section className="warehouse-inventory">
        {inventory.map((inventoryItem) => {
          return (
            <div key={inventoryItem.id} className="warehouse-inventory__row">
              <ListBodyLink
                className="list-body__item--item-name"
                title="Inventory Item"
                linkTo={`/inventory/${inventoryItem.id}`}
                content={inventoryItem.item_name}
              />

              <ListBodyChip
                className="list-body__item--status"
                title="Status"
                content={inventoryItem.status}
                count={inventoryItem.quantity}
              />

              <ListBodyText
                className="list-body__item--category"
                title="Category"
                content={inventoryItem.category}
              />

              <ListBodyText
                className="list-body__item--quantity"
                title="Qty"
                content={`${inventoryItem.quantity}`}
              />

              <ListBodyActions
                className="list-body__item--actions"
                onDelete={() => handleModalOpen(inventoryItem)}
                onEdit={() => navigate(`/inventory/${inventoryItem.id}/edit`)}
              />
            </div>
          );
        })}
      </section>
      {showModal &&
        createPortal(
          <Modal
            setShowModal={setShowModal}
            setDeleted={setDeletedItem}
            handleDelete={handleDelete}
            dataToDelete={deletedItem}
            type={"inventory"}
          />,
          document.querySelector<HTMLElement>(".warehouse-container")!
        )}
    </div>
  );
}

export default WarehouseDetailsPage;
