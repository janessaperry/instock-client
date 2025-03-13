import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import InputSearch from "../../components/InputSearch/InputSearch";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import { DeleteOutlineIcon, EditIcon } from "../../components/Icons/Icons";
import { WarehouseDetails } from "../../types";
import "./WarehousesPage.scss";

interface WarehousesPageProps {
  baseApiUrl: string;
}

function WarehousesPage({ baseApiUrl }: WarehousesPageProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deletedId, setDeletedId] = useState<number | null>(null);
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
    } catch (error) {
      console.error(`Error deleting warehouse ${warehouseId}: ${error}`);
    }
  };

  useEffect(() => {
    getAllWarehouses();
  }, []);

  if (!warehouses.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="warehouses-container">
      <ContainerHeader
        title="Warehouses"
        search={<InputSearch placeholder="Search..." />}
        button={
          <Button
            className="btn--primary"
            label="Add New Warehouse"
            handleClick={() => navigate("/add")}
          />
        }
      />

      <section className="warehouses-list">
        {warehouses.map((warehouse) => {
          return (
            <div key={warehouse.id} className="warehouses-list__row">
              <div className="warehouses-list__item">
                <h4 className="warehouses-list__title">Warehouse</h4>
                <Link
                  to={`/${warehouse.id}`}
                  className="warehouses-list__content warehouses-list__content--link"
                >
                  {warehouse.warehouse_name}
                </Link>
              </div>

              <div className="warehouses-list__item">
                <h4 className="warehouses-list__title">Contact Name</h4>
                <p className="warehouses-list__content">
                  {warehouse.contact_name}
                </p>
              </div>

              <div className="warehouses-list__item">
                <h4 className="warehouses-list__title">Address</h4>
                <p className="warehouses-list__content">{warehouse.address}</p>
              </div>

              <div className="warehouses-list__item">
                <h4 className="warehouses-list__title">Contact Information</h4>
                <p className="warehouses-list__content">
                  {warehouse.contact_phone}
                  <br />
                  {warehouse.contact_email}
                </p>
              </div>

              <div className="warehouses-list__actions">
                <Button
                  icon={<DeleteOutlineIcon />}
                  className="btn--icon"
                  handleClick={() => {
                    setShowModal(true);
                    setDeletedId(warehouse.id);
                  }}
                />
                <Button
                  icon={<EditIcon />}
                  className="btn--icon"
                  handleClick={() => navigate(`/${warehouse.id}/edit`)}
                />
              </div>
            </div>
          );
        })}
      </section>
      {showModal &&
        createPortal(
          <Modal
            setShowModal={setShowModal}
            setDeletedId={setDeletedId}
            handleDelete={handleDelete}
            idToDelete={deletedId}
          />,
          document.body
        )}
    </div>
  );
}

export default WarehousesPage;
