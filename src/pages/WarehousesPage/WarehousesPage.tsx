import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./WarehousesPage.scss";

interface WarehousesPageProps {
  baseApiUrl: string;
}

interface Warehouses {
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

function WarehousesPage({ baseApiUrl }: WarehousesPageProps) {
  const [warehouses, setWarehouses] = useState<Warehouses[]>([]);

  const getAllWarehouses = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/warehouses`);
      setWarehouses(response.data);
    } catch (error) {
      console.error(`Error fetching warehouses: ${error}`);
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
      <header className="warehouses-header">
        <h1 className="warehouses-header__title">Warehouses</h1>
        <div className="warehouses-header__actions">
          <input
            className="warehouses-header__search"
            type="text"
            placeholder="Search..."
          />
          <button className="warehouses-header__button">
            Add New Warehouse
          </button>
        </div>
      </header>

      <section className="warehouses-list">
        {warehouses.map((warehouse) => {
          return (
            <div key={warehouse.id} className="warehouses-list__row">
              <div className="warehouses-list__item">
                <h4 className="warehouses-list__title">Warehouse</h4>
                <Link
                  to={`/warehouses/${warehouse.id}`}
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
                <button>Delete</button>
                <button>Edit</button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default WarehousesPage;
