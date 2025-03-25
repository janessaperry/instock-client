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
    warehouseName: {
      value: inventoryObject?.warehouseName || "",
      hasError: false,
    },
  });

  const [formData, setFormData] = useState<FormDataProps>(
    formDataObject(existingItemDetails)
  );

  const getItemDetails = async () => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/inventories/${inventoryId}`
      );
      const itemData = response.data;
      // console.log("ITEMDATA:", itemData);
      setExistingItemDetails(itemData);
      setFormData(formDataObject(itemData));
    } catch (error) {
      console.error(`Error fetching inventory item details: ${error}`);
    }
  };

  const addNewItem = async (newItem: Object) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/inventories/add`,
        newItem
      );
      console.log(response);
    } catch (error) {
      console.error(`Error adding new inventory item: ${error}`);
    }
  };

  const editExistingItem = async (updatedItem: Object) => {
    try {
      await axios.put(
        `${baseApiUrl}/inventories/${inventoryId}/edit`,
        updatedItem
      );
    } catch (error) {
      console.error(`Error adding new inventory item: ${error}`);
    }
  };

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
    } catch (error) {
      console.error(`Error getting inventory categories: ${error}`);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    const requiredFields = [
      "itemName",
      "description",
      "category",
      "status",
      "warehouseName",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].value.trim()) {
        setFormData((prevData) => ({
          ...prevData,
          [field]: {
            ...prevData[field],
            hasError: true,
          },
        }));
        isValid = false;
      }
    });

    if (formData.status.value === "In Stock") {
      const quantityValue = Number(formData.quantity.value);
      if (!quantityValue || quantityValue <= 0) {
        setFormData((prevData) => ({
          ...prevData,
          quantity: {
            ...prevData.quantity,
            hasError: true,
          },
        }));
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    const itemDetails = {
      item_name: formData.itemName.value,
      description: formData.description.value,
      category: formData.category.value,
      status: formData.status.value,
      quantity:
        formData.status.value === "Out of Stock" ? 0 : formData.quantity.value,
      warehouse_id: Number(
        warehousesList.find(
          (warehouse) => warehouse.value === formData.warehouseName.value
        )?.id
      ),
    };

    console.log(itemDetails);

    editMode
      ? await editExistingItem(itemDetails)
      : await addNewItem(itemDetails);

    alert("Saved!");
    navigate(`/inventory`);
  };

  useEffect(() => {
    getWarehousesList();
    getInventoryCategories();
    editMode && getItemDetails();
  }, [inventoryId]);

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
              { id: "1", value: "In Stock" },
              { id: "2", value: "Out of Stock" },
            ]}
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {formData.status.value === "In Stock" && (
            <InputText
              label="Quantity"
              fieldName="quantity"
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}

          <InputDropdown
            label="Warehouse"
            fieldName="warehouseName"
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
