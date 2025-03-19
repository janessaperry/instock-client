import { useEffect, useState } from "react";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import "./InventoryItemDetailsPage.scss";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button";
import { ArrowBackIcon, EditIcon } from "../../components/Icons/Icons";

interface InventoryItemDetailsPageProps {
  baseApiUrl: string;
}

interface InventoryItem {
  id: number;
  itemName: string;
  description: string;
  category: string;
  status: string;
  quantity: number;
  warehouseName: string;
}

function InventoryItemDetailsPage({
  baseApiUrl,
}: InventoryItemDetailsPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemDetails, setItemDetails] = useState({} as InventoryItem);

  const getItemDetails = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/inventories/${itemId}`);
      console.log(response.data);
      setItemDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching item details.`);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, [itemId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="inventory-container">
      <ContainerHeader
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
            icon={<EditIcon color="white" size="20" />}
            className="btn--primary"
            handleClick={() => navigate(`/inventory/${itemDetails.id}/edit`)}
            label="Edit"
          />
        }
      />

      <section className="item-details">
        <div className="item-details__wrapper">
          <div className="item-details__info item-details__info--description">
            <h4 className="item-details__info-title">Item Description</h4>
            <p className="item-details__info-content">
              {itemDetails.description}
            </p>
          </div>

          <div className="item-details__info item-details__info--category">
            <h4 className="item-details__info-title">Category</h4>
            <p className="item-details__info-content">{itemDetails.category}</p>
          </div>
        </div>

        <div className="item-details__wrapper">
          <div className="item-details__info">
            <h4 className="">Status</h4>
            <p>{itemDetails.status}</p>
          </div>

          <div className="item-details__info">
            <h4 className="">Quantity</h4>
            <p>{itemDetails.quantity}</p>
          </div>

          <div className="item-details__info">
            <h4 className="">Warehouse</h4>
            <p>{itemDetails.warehouseName}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InventoryItemDetailsPage;
