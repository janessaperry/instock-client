// Libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import { ArrowBackIcon, EditIcon } from "../../components/Icons/Icons";

// Types & Services
import { ApiService } from "../../api/apiService";

// Styles
import "./InventoryItemDetailsPage.scss";

interface InventoryItem {
  id: number;
  itemName: string;
  description: string;
  category: string;
  status: string;
  quantity: number;
  warehouseName: string;
}

function InventoryItemDetailsPage() {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemDetails, setItemDetails] = useState({} as InventoryItem);

  const getItemDetails = async () => {
    try {
      const data = await apiService.getById("inventories", Number(itemId));
      setItemDetails(data);
      setIsLoading(false);
    } catch (error: any) {
      const message: string = error.message || "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, [itemId]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="inventory-container">
      <ContainerHeader
        className="inventory-header"
        title={itemDetails.itemName}
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
            handleClick={() => navigate(`/inventory/${itemDetails.id}/edit`)}
          />
        }
      />

      <section className="item-details">
        <div className="item-details__wrapper">
          <div className="item-details__info item-details__info--description">
            <h4 className="item-details__info-title">Item Description:</h4>
            <p className="item-details__info-content">
              {itemDetails.description}
            </p>
          </div>

          <div className="item-details__info item-details__info--category">
            <h4 className="item-details__info-title">Category:</h4>
            <p className="item-details__info-content">{itemDetails.category}</p>
          </div>
        </div>

        <div className="item-details__wrapper">
          <div className="item-details__info item-details__info--status">
            <h4 className="item-details__info-title">Status:</h4>
            <p
              className={`item-details__info-chip item-details__info-chip--${
                itemDetails.quantity === 0 ? "out-of-stock" : "in-stock"
              }`}
            >
              {itemDetails.status}
            </p>
          </div>

          <div className="item-details__info item-details__info--quantity">
            <h4 className="item-details__info-title">Quantity:</h4>
            <p className="item-details__info-content">{itemDetails.quantity}</p>
          </div>

          <div className="item-details__info item-details__info--warehouse">
            <h4 className="item-details__info-title">Warehouse:</h4>
            <p className="item-details__info-content">
              {itemDetails.warehouseName}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InventoryItemDetailsPage;
