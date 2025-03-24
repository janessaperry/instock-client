// Libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Components
import Button from "../../components/Button/Button";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import InputText from "../../components/InputText/InputText";
import InputTextarea from "../../components/InputTextarea/InputTextarea";
import InputDropdown from "../../components/InputDropdown/InputDropdown";
import InputRadio from "../../components/InputRadio/InputRadio";
import { ArrowBackIcon } from "../../components/Icons/Icons";

// Types
import {
  FormDataProps,
  InventoryItemDetailsProps,
  WarehouseDetails,
  OptionProps,
} from "../../types";

// Styles
import "./InventoryFormPage.scss";

interface InventoryFormPageProps {
  baseApiUrl: string;
  editMode: boolean;
}

function InventoryFormPage({ baseApiUrl, editMode }: InventoryFormPageProps) {
  const navigate = useNavigate();
  const { inventoryId } = useParams();
  const [inventoryCategories, setInventoryCategories] = useState<OptionProps[]>(
    []
  );
  const [warehousesList, setWarehousesList] = useState<
    { id: string; value: string }[]
  >([]);
  const [existingItemDetails, setExistingItemDetails] =
    useState<InventoryItemDetailsProps>({} as InventoryItemDetailsProps);

  const formDataObject = (inventoryObject: InventoryItemDetailsProps) => ({
    itemName: {
      value: inventoryObject?.itemName || "",
      hasError: false,
    },
    description: {
      value: inventoryObject?.description || "",
      hasError: false,
    },
    category: {
      value: inventoryObject?.category || "",
      hasError: false,
    },
    status: {
      value: inventoryObject?.status || "",
      hasError: false,
    },
    quantity: {
      value: inventoryObject?.quantity || "",
      hasError: false,
    },
    warehouse: {
      value: inventoryObject?.warehouse || "",
      hasError: false,
    },
  });

  const [formData, setFormData] = useState<FormDataProps>(
    formDataObject(existingItemDetails)
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        value: value,
        hasError: false,
      },
    }));
  };

  const getWarehousesList = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/warehouses`);
      const list = response.data.map((warehouse: WarehouseDetails) => {
        return {
          id: `${warehouse.id}`,
          value: warehouse.warehouse_name,
        };
      });
      setWarehousesList(list);
    } catch (error) {
      console.error(`Error fetching warehouses: ${error}`);
    }
  };

  const getInventoryCategories = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/inventories/categories`);
      setInventoryCategories(response.data);
    } catch (error) {}
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submit clicked");
    console.log(formData);

    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (formData[key].value.trim().length === 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [key]: {
            ...prevFormData[key],
            hasError: true,
          },
        }));
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    console.log("validated");
  };

  useEffect(() => {
    getWarehousesList();
    getInventoryCategories();
    // setFormData(formDataObject);
  }, []);

  return (
    <div className="form-container">
      <ContainerHeader
        title={`${editMode ? "Edit" : "Add New"} Inventory Item`}
        prevBtn={
          <Button
            className="btn--icon"
            icon={<ArrowBackIcon />}
            handleClick={() => navigate(-1)}
          />
        }
      />

      <form className="form" onSubmit={handleFormSubmit}>
        <section className="form__section">
          <h2 className="form__section-title">Item Details</h2>

          <InputText
            label={"Item Name"}
            fieldName={"itemName"}
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputTextarea
            label={"Description"}
            placeholder={"Please enter a brief item description..."}
            fieldName={"description"}
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputDropdown
            label="Category"
            fieldName="category"
            options={inventoryCategories}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </section>

        <section className="form__section">
          <h2 className="form__section-title">Item Availability</h2>

          <InputRadio
            label="Status"
            fieldName="status"
            options={[
              { id: "1", value: "In stock" },
              { id: "2", value: "Out of stock" },
            ]}
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {formData["status"].value === "In stock" && (
            <InputText
              label="Quantity"
              fieldName="quantity"
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}

          <InputDropdown
            label="Warehouse"
            fieldName="warehouse"
            options={warehousesList}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </section>

        <div className="form__actions">
          <Button
            btnType="button"
            className="btn--secondary form__btn"
            label={"Cancel"}
            handleClick={() => navigate(-1)}
          />

          <Button
            btnType="submit"
            className="btn--primary form__btn"
            label={`${editMode ? "Save" : "Add Item"} `}
          />
        </div>
      </form>
    </div>
  );
}

export default InventoryFormPage;
