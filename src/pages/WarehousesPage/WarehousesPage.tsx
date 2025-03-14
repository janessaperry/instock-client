// Libraries
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import InputSearch from "../../components/InputSearch/InputSearch";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import Loading from "../../components/Loading/Loading";
import ListHeaderItem from "../../components/ListHeaderItem/ListHeaderItem";
import {
  ListBodyActions,
  ListBodyLink,
  ListBodyText,
} from "../../components/ListBodyItem/ListBodyItem";
import { SortIcon } from "../../components/Icons/Icons";

// Types
import { WarehouseDetails, DeletedWarehouseProps } from "../../types";

// Styles
import "./WarehousesPage.scss";

interface WarehousesPageProps {
  baseApiUrl: string;
}

function WarehousesPage({ baseApiUrl }: WarehousesPageProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deletedWarehouse, setDeletedWarehouse] =
    useState<DeletedWarehouseProps | null>(null);
  const [warehouses, setWarehouses] = useState<WarehouseDetails[]>([]);

  const getAllWarehouses = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/warehouses`);
      setWarehouses(response.data);
    } catch (error) {
      console.error(`Error fetching warehouses: ${error}`);
    }
  };

  const handleDelete = async (warehouseId: number) => {
    try {
      await axios.delete(`${baseApiUrl}/warehouses/${warehouseId}`);
      await getAllWarehouses();
      setShowModal(false);
      setDeletedWarehouse(null);
    } catch (error) {
      console.error(`Error deleting warehouse ${warehouseId}: ${error}`);
    }
  };

  const handleModalOpen = (warehouse: WarehouseDetails) => {
    setShowModal(true);
    setDeletedWarehouse({
      warehouseId: warehouse.id,
      warehouseName: warehouse.warehouse_name,
    });
  };

  useEffect(() => {
    getAllWarehouses();
  }, []);

  if (!warehouses.length) {
    return <Loading />;
  }

  return (
    <div className="warehouses-container">
      <ContainerHeader
        title="Warehouses"
        className="container-header--tablet-border-none"
        search={<InputSearch placeholder="Search..." />}
        button={
          <Button
            className="btn--primary"
            label="Add New Warehouse"
            handleClick={() => navigate("/add")}
          />
        }
      />

      <section className="warehouses-section">
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
            icon={<SortIcon className="list-header__sort" />}
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
                  linkTo={`${warehouse.id}`}
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
                  onEdit={() => navigate(`/${warehouse.id}/edit`)}
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
            setDeletedWarehouse={setDeletedWarehouse}
            handleDelete={handleDelete}
            warehouseToDelete={deletedWarehouse}
          />,
          document.body
        )}
    </div>
  );
}

export default WarehousesPage;
