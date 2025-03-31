// Libraries
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";

// Components
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import Button from "../../components/Button/Button";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import ListHeaderItem from "../../components/ListHeaderItem/ListHeaderItem";
import {
  ListBodyActions,
  ListBodyChip,
  ListBodyLink,
  ListBodyText,
} from "../../components/ListBodyItem/ListBodyItem";
import {
  ArrowBackIcon,
  EditIcon,
  SortIcon,
} from "../../components/Icons/Icons";

// Types & Services
import { ApiService } from "../../api/apiService";
import { DeletedRecordProps } from "../../types";

// Styles
import "./WarehouseDetailsPage.scss";

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

function WarehouseDetailsPage() {
  const apiService = new ApiService();
  const { warehouseId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<DeletedRecordProps | null>(
    null
  );
  const [warehouse, setWarehouse] = useState<Warehouse>({} as Warehouse);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const navigate = useNavigate();

  const getWarehouseDetails = async () => {
    try {
      const data = await apiService.getById("warehouses", Number(warehouseId));
      setWarehouse(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getInventoryByWarehouse = async () => {
    try {
      const data = await apiService.getInventoryByWarehouseId(
        "warehouses",
        Number(warehouseId)
      );
      setInventory(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await apiService.delete("inventories", deletedItem!.id);
      await getInventoryByWarehouse();
      setShowModal(false);
      setDeletedItem(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

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
            handleClick={() => navigate(`/warehouses/${warehouse.id}/edit`)}
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
        <div className="list-header">
          <ListHeaderItem
            className="list-header__item--item-name"
            icon={<SortIcon className="list-header__sort" />}
            label="Inventory Item"
          />

          <ListHeaderItem
            className="list-header__item--category"
            icon={<SortIcon className="list-header__sort" />}
            label="Category"
          />

          <ListHeaderItem
            className="list-header__item--status"
            icon={<SortIcon className="list-header__sort" />}
            label="Status"
          />

          <ListHeaderItem
            className="list-header__item--quantity"
            icon={<SortIcon className="list-header__sort" />}
            label="Quantity"
          />

          <ListHeaderItem
            className="list-header__item--actions"
            label="Actions"
          />
        </div>

        <div className="list-body">
          {inventory.map((inventoryItem) => {
            return (
              <div key={inventoryItem.id} className="list-body__row">
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
        </div>
      </section>
      {showModal &&
        createPortal(
          <ModalConfirm
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
