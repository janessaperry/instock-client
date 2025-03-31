// Libraries
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import Button from "../../components/Button/Button";
import InputSearch from "../../components/InputSearch/InputSearch";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import ListHeaderItem from "../../components/ListHeaderItem/ListHeaderItem";
import {
  ListBodyActions,
  ListBodyLink,
  ListBodyText,
} from "../../components/ListBodyItem/ListBodyItem";
import { SortIcon } from "../../components/Icons/Icons";

// Types & Services
import { ApiService } from "../../api/apiService";
import { WarehouseDetails, DeletedRecordProps } from "../../types";

// Styles
import "./WarehousesPage.scss";

function WarehousesPage() {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [deletedWarehouse, setDeletedWarehouse] =
    useState<DeletedRecordProps | null>(null);
  const [warehouses, setWarehouses] = useState<WarehouseDetails[]>([]);

  const getAllWarehouses = async () => {
    try {
      const data = await apiService.getAll("warehouses");
      setWarehouses(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (warehouseId: number) => {
    try {
      await apiService.delete("warehouses", warehouseId);
      await getAllWarehouses();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setShowModal(false);
      setDeletedWarehouse(null);
      setIsLoading(false);
    }
  };

  const handleModalOpen = (warehouse: WarehouseDetails) => {
    setShowModal(true);
    setDeletedWarehouse({
      id: warehouse.id,
      name: warehouse.warehouse_name,
    });
  };

  useEffect(() => {
    getAllWarehouses();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="warehouses-container">
      <ContainerHeader
        title="Warehouses"
        className="container-header--border-none"
        search={<InputSearch placeholder="Search..." />}
        button={
          <Button
            className="btn--primary"
            label="Add New Warehouse"
            handleClick={() => navigate("/warehouses/add")}
          />
        }
      />

      <section className="warehouses-list">
        <div className="list-header">
          <ListHeaderItem
            className="list-header__item--warehouse-name"
            icon={<SortIcon className="list-header__sort" />}
            label="Warehouse"
          />

          <ListHeaderItem
            className="list-header__item--address"
            icon={<SortIcon className="list-header__sort" />}
            label="Address"
          />

          <ListHeaderItem
            className="list-header__item--contact-name"
            icon={<SortIcon className="list-header__sort" />}
            label="Contact Name"
          />

          <ListHeaderItem
            className="list-header__item--contact-info"
            icon={<SortIcon className="list-header__sort" />}
            label="Contact Information"
          />

          <ListHeaderItem
            className="list-header__item--actions"
            label="Actions"
          />
        </div>

        <div className="list-body">
          {warehouses.map((warehouse) => {
            return (
              <div key={warehouse.id} className="list-body__row">
                <ListBodyLink
                  className="list-body__item--warehouse-name"
                  title="Warehouse"
                  linkTo={`/warehouses/${warehouse.id}`}
                  content={warehouse.warehouse_name}
                />

                <ListBodyText
                  className="list-body__item--contact-name"
                  title="Contact Name"
                  content={warehouse.contact_name}
                />

                <ListBodyText
                  className="list-body__item--address"
                  title="Address"
                  content={`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
                />

                <ListBodyText
                  className="list-body__item--contact-info"
                  title="Contact Information"
                  content={[
                    `${warehouse.contact_phone}`,
                    `${warehouse.contact_email}`,
                  ]}
                />

                <ListBodyActions
                  className="list-body__item--actions"
                  onDelete={() => handleModalOpen(warehouse)}
                  onEdit={() => navigate(`/warehouses/${warehouse.id}/edit`)}
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
            setDeleted={setDeletedWarehouse}
            handleDelete={handleDelete}
            dataToDelete={deletedWarehouse}
            type="warehouse"
          />,
          document.querySelector<HTMLElement>(".warehouses-container")!
        )}
    </div>
  );
}

export default WarehousesPage;
