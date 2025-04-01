// Libraries
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import InputSearch from "../../components/InputSearch/InputSearch";
import ListHeaderItem from "../../components/ListHeaderItem/ListHeaderItem";
import { SortIcon } from "../../components/Icons/Icons";
import {
  ListBodyActions,
  ListBodyChip,
  ListBodyEmpty,
  ListBodyLink,
  ListBodyText,
} from "../../components/ListBodyItem/ListBodyItem";

// Types & Services
import { ApiService } from "../../api/apiService";
import { DeletedRecordProps } from "../../types";

// Styles
import "./InventoryPage.scss";

interface Inventory {
  id: number;
  warehouse_name: string;
  item_name: string;
  category: string;
  status: string;
  quantity: number;
}

function InventoryPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<DeletedRecordProps | null>(
    null
  );
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const navigate = useNavigate();

  const apiService = new ApiService();
  const getAllInventories = async () => {
    try {
      const data = await apiService.getAll("inventories");
      setInventories(data);
      setIsLoading(false);
    } catch (error: any) {
      const message: string = error.message || "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId: number) => {
    try {
      await apiService.delete("inventories", itemId);
      await apiService.getAll("inventories");
      setShowModal(false);
      setDeletedItem(null);
    } catch (error: any) {
      const message: string = error.message || "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
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
  if (error) return <Error message={error} />;

  return (
    <div className="inventories-container">
      <ContainerHeader
        title="Inventory"
        className="container-header--border-none container-header--with-search"
        search={<InputSearch placeholder="Search..." />}
        button={
          <Button
            className="btn--primary"
            label="Add New Item"
            handleClick={() => navigate("/inventory/add")}
          />
        }
      />

      <section className="inventories-list">
        <div className="list-header">
          <ListHeaderItem
            className="list-header__item--item-name"
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
            className="list-header__item--quantity"
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
          {inventories.length === 0 ? (
            <ListBodyEmpty item="inventory" />
          ) : (
            inventories.map((item) => {
              return (
                <div key={item.id} className="list-body__row">
                  <ListBodyLink
                    className="list-body__item--item-name"
                    title="Inventory Item"
                    content={item.item_name}
                    linkTo={`/inventory/${item.id}`}
                  />

                  <ListBodyChip
                    className="list-body__item--status"
                    title="Status"
                    count={item.quantity}
                    content={item.status}
                  />

                  <ListBodyText
                    className="list-body__item--category"
                    title="Category"
                    content={item.category}
                  />

                  <ListBodyText
                    className="list-body__item--quantity"
                    title="Qty"
                    content={`${item.quantity}`}
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
            })
          )}
        </div>
      </section>

      {showModal &&
        createPortal(
          <ModalConfirm
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
