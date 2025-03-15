import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import InputSearch from "../../components/InputSearch/InputSearch";
import "./InventoryPage.scss";
import ListHeaderItem from "../../components/ListHeaderItem/ListHeaderItem";
import { SortIcon } from "../../components/Icons/Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import {
  ListBodyChip,
  ListBodyLink,
  ListBodyText,
} from "../../components/ListBodyItem/ListBodyItem";

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
            console.log(item);
            return (
              <div key={item.id}>
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
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default InventoryPage;
