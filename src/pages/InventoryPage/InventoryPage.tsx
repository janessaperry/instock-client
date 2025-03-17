// Libraries
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Modal from "../../components/Modal/Modal";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import InputSearch from "../../components/InputSearch/InputSearch";
import ListHeaderItem from "../../components/ListHeaderItem/ListHeaderItem";
import { SortIcon } from "../../components/Icons/Icons";
import {
  ListBodyActions,
  ListBodyChip,
  ListBodyLink,
  ListBodyText,
} from "../../components/ListBodyItem/ListBodyItem";

// Types
import { DeletedRecordProps } from "../../types";

// Styles
import "./InventoryPage.scss";

interface InventoryPageProps {
  baseApiUrl: string;
}

interface Inventory {
  id: number;
  warehouse_name: string;
  item_name: string;
  category: string;
  status: string;
  quantity: number;
}
function InventoryPage({ baseApiUrl }: InventoryPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<DeletedRecordProps | null>(
    null
  );
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const navigate = useNavigate();

  const getAllInventories = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/inventories`);
      setInventories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching inventories: ${error}`);
    }
  };

  const handleDelete = async (itemId: number) => {
    try {
      await axios.delete(`${baseApiUrl}/inventories/${itemId}`);
      await getAllInventories();
      setShowModal(false);
      setDeletedItem(null);
    } catch (error) {
      console.error(`Error deleting item ${itemId}: ${error}`);
    }
  };

  const handleModalOpen = (item: Inventory) => {
    setShowModal(true);
    setDeletedItem({
      id: item.id,
      name: item.item_name,
    });
  };

  useEffect(() => {
    getAllInventories();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="inventories-container">
      <ContainerHeader
        title="Inventory"
        className="container-header--tablet-borde-none"
        search={<InputSearch placeholder="Search..." />}
        button={
          <Button
            className="btn--primary"
            label="Add New Item"
            handleClick={() => navigate("/inventory/add")}
          />
        }
      />

      <section className="inventories-section">
        <div className="list-header">
          <ListHeaderItem
            className="list-header__item--inventory-item"
            icon={<SortIcon className="list-header__sort" />}
            label="Inventory Item"
          />

          <ListHeaderItem
            className="list-header__item--category"
            icon={<SortIcon className="list-header__icon" />}
            label="Category"
          />

          <ListHeaderItem
            className="list-header__item--status"
            icon={<SortIcon className="list-header__icon" />}
            label="Status"
          />

          <ListHeaderItem
            className="list-header__item--qty"
            icon={<SortIcon className="list-header__icon" />}
            label="Qty"
          />

          <ListHeaderItem
            className="list-header__item--warehouse"
            icon={<SortIcon className="list-header__icon" />}
            label="Warehouse"
          />

          <ListHeaderItem
            className="list-header__item--actions"
            label="Actions"
          />
        </div>

        <div className="list-body">
          {inventories.map((item) => {
            return (
              <div key={item.id} className="list-body__row">
                <ListBodyLink
                  className="list-body__item--inventory-item"
                  title="Inventory Item"
                  content={item.item_name}
                  linkTo={`${item.id}`}
                />

                <ListBodyText
                  className="list-body__item--status"
                  title="Status"
                  content={item.status}
                />

                <ListBodyText
                  className="list-body__item--category"
                  title="Category"
                  content={item.category}
                />

                <ListBodyChip
                  className="list-body__item--status"
                  title="Quantity"
                  count={item.quantity}
                  content={item.status}
                />

                <ListBodyText
                  className="list-body__item--warehouse"
                  title="Warehouse"
                  content={`${item.warehouse_name}`}
                />

                <ListBodyActions
                  className="list-body__item--actions"
                  onDelete={() => handleModalOpen(item)}
                  onEdit={() => navigate(`/inventory/${item.id}/edit`)}
                />
              </div>
            );
          })}
        </div>
      </section>

      {showModal &&
        createPortal(
          <Modal
            setShowModal={setShowModal}
            setDeleted={setDeletedItem}
            handleDelete={handleDelete}
            dataToDelete={deletedItem}
            type="inventory"
          />,
          document.querySelector<HTMLElement>(".inventories-container")!
        )}
    </div>
  );
}

export default InventoryPage;
