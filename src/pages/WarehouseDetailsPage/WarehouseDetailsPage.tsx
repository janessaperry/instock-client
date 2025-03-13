import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import {
  ArrowBackIcon,
  DeleteOutlineIcon,
  EditIcon,
} from "../../components/Icons/Icons";
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
            icon={<EditIcon color="white" />}
            className="btn--primary"
            handleClick={() => navigate(`/${warehouse.id}/edit`)}
          />
        }
      />

      <section className="warehouse-details">
        <div className="warehouse-details__info">
          <h4 className="warehouse-details__title">Warehouse Address:</h4>
          <p className="warehouse-details__content">{warehouse.address}</p>
        </div>
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
      </section>

      <section className="warehouse-inventory">
        {inventory.map((inventoryItem) => {
          return (
            <div key={inventoryItem.id} className="warehouse-inventory__row">
              <div className="warehouse-inventory__item">
                <h4 className="warehouse-inventory__title">Inventory Item</h4>
                <Link
                  to={`/${inventoryItem.id}`}
                  className="warehouse-inventory__content warehouse-inventory__content--link"
                >
                  {inventoryItem.item_name}
                </Link>
              </div>

              <div className="warehouse-inventory__item">
                <h4 className="warehouse-inventory__title">Status</h4>
                <p
                  className={`warehouse-inventory__chip warehouse-inventory__chip${
                    inventoryItem.quantity === 0
                      ? "--out-of-stock"
                      : "--in-stock"
                  }`}
                >
                  {inventoryItem.status}
                </p>
              </div>

              <div className="warehouse-inventory__item">
                <h4 className="warehouse-inventory__title">Category</h4>
                <p className="warehouse-inventory__content">
                  {inventoryItem.category}
                </p>
              </div>

              <div className="warehouse-inventory__item">
                <h4 className="warehouse-inventory__title">Qty</h4>
                <p className="warehouse-inventory__content">
                  {inventoryItem.quantity}
                </p>
              </div>

              <div className="warehouse-inventory__actions">
                <Button
                  icon={<DeleteOutlineIcon />}
                  className="btn--icon"
                  handleClick={() => console.log("add delete modal")}
                />
                <Button
                  icon={<EditIcon />}
                  className="btn--icon"
                  handleClick={() =>
                    console.log("navigate to edit inventory item")
                  }
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default WarehouseDetailsPage;
