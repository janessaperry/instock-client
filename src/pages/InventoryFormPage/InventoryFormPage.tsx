// Libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";

// Components
import Button from "../../components/Button/Button";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import InputText from "../../components/InputText/InputText";
import InputTextarea from "../../components/InputTextarea/InputTextarea";
import InputDropdown from "../../components/InputDropdown/InputDropdown";
import InputRadio from "../../components/InputRadio/InputRadio";
import InputNumber from "../../components/InputNumber/InputNumber";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { ArrowBackIcon } from "../../components/Icons/Icons";

// Types & Services
import { ApiService } from "../../api/apiService";
import {
  FormDataProps,
  InventoryItemDetailsProps,
  WarehouseDetails,
} from "../../types";

// Styles
import "./InventoryFormPage.scss";

interface InventoryFormPageProps {
  editMode: boolean;
}

function InventoryFormPage({ editMode }: InventoryFormPageProps) {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const { inventoryId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
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

  const inventoryCategories = [
    { id: "1", value: "Accessories" },
    { id: "2", value: "Apparel" },
    { id: "3", value: "Electronics" },
    { id: "4", value: "Gear" },
    { id: "5", value: "Health" },
  ];

  const getItemDetails = async () => {
    try {
      const data = await apiService.getById("inventories", Number(inventoryId));
      const itemData = data;
      setExistingItemDetails(itemData);
      setFormData(formDataObject(itemData));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewItem = async (newItem: Object) => {
    try {
      await apiService.add("inventories", newItem);
      setShowModal(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editExistingItem = async (updatedItem: Object) => {
    try {
      await apiService.edit("inventories", Number(inventoryId), updatedItem);
      setShowModal(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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
      const data = await apiService.getAll("warehouses");
      const list = data.map((warehouse: WarehouseDetails) => {
        return {
          id: `${warehouse.id}`,
          value: warehouse.warehouse_name,
        };
      });
      setWarehousesList(list);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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

    editMode
      ? await editExistingItem(itemDetails)
      : await addNewItem(itemDetails);
  };

  useEffect(() => {
    getWarehousesList();
    editMode && getItemDetails();
  }, [inventoryId]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

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
            <InputNumber
              label="Quantity"
              fieldName="quantity"
              inputMode="numeric"
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
      {showModal &&
        createPortal(
          <ModalSuccess
            type={"inventory item"}
            nameValue={formData.itemName.value}
            editMode={editMode}
            showModal={showModal}
            setShowModal={setShowModal}
            onDone={() => navigate("/inventory")}
          />,
          document.querySelector(".form-container") || document.body
        )}
    </div>
  );
}

export default InventoryFormPage;
