import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { WarehouseFormData } from "../../types";
import InputText from "../../components/InputText/InputText";
import "./WarehouseFormPage.scss";

interface WarehousesFormPageProps {
  baseApiUrl: string;
  editMode: boolean;
}

function WarehouseFormPage({ baseApiUrl, editMode }: WarehousesFormPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { existingWarehouseDetails } = location.state || {};
  const { warehouseId } = useParams();
  const [formData, setFormData] = useState<WarehouseFormData>({
    warehouseName: {
      value: existingWarehouseDetails?.warehouse_name || "",
      hasError: false,
    },
    address: {
      value: existingWarehouseDetails?.address || "",
      hasError: false,
    },
    city: {
      value: existingWarehouseDetails?.city || "",
      hasError: false,
    },
    country: {
      value: existingWarehouseDetails?.country || "",
      hasError: false,
    },
    contactName: {
      value: existingWarehouseDetails?.contact_name || "",
      hasError: false,
    },
    contactPosition: {
      value: existingWarehouseDetails?.contact_position || "",
      hasError: false,
    },
    contactPhone: {
      value: existingWarehouseDetails?.contact_phone || "",
      hasError: false,
    },
    contactEmail: {
      value: existingWarehouseDetails?.contact_email || "",
      hasError: false,
    },
  });

  const addNewWarehouse = async (newWarehouse: Object) => {
    try {
      await axios.post(`${baseApiUrl}/warehouses/add`, newWarehouse);
      alert("Warehouse added!");
      navigate("/");
    } catch (error) {
      console.error(`Error adding new warehouse: ${error}`);
    }
  };

  const editExistingWarehouse = async (updatedWarehouse: Object) => {
    try {
      await axios.put(
        `${baseApiUrl}/warehouses/${warehouseId}/edit`,
        updatedWarehouse
      );
      alert("Warehouse edited!");
      navigate("/");
    } catch (error) {
      console.error(`Error editing warehouse ${warehouseId}: ${error}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        value: value,
        hasError: false,
      },
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    const warehouseDetails = {
      warehouse_name: formData.warehouseName.value,
      address: formData.address.value,
      city: formData.city.value,
      country: formData.country.value,
      contact_name: formData.contactName.value,
      contact_position: formData.contactPosition.value,
      contact_phone: formData.contactPhone.value,
      contact_email: formData.contactEmail.value,
    };

    editMode
      ? await editExistingWarehouse(warehouseDetails)
      : await addNewWarehouse(warehouseDetails);
  };

  return (
    <div className="form-container">
      <header className="form-container__header">
        <button onClick={() => navigate(-1)}>Back</button>
        <h1 className="form-container__title">
          {editMode ? "Edit" : "Add New"} Warehouse
        </h1>
      </header>

      <form className="form" onSubmit={handleFormSubmit}>
        <section className="form__section">
          <h2 className="form_section-title">Warehouse Details</h2>

          <InputText
            label="Warehouse Name"
            fieldName="warehouseName"
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputText
            label="Address"
            fieldName="address"
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputText
            label="City"
            fieldName="city"
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputText
            label="Country"
            fieldName="country"
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </section>

        <section className="form__section">
          <h2 className="form_section-title">Contact Details</h2>

          <InputText
            label="Contact Name"
            fieldName="contactName"
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputText
            label="Position"
            fieldName="contactPosition"
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputText
            label="Phone Number"
            fieldName="contactPhone"
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <InputText
            label="Email"
            fieldName="contactEmail"
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </section>

        <button
          className="btn btn--secondary"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button className="btn btn--primary">Save</button>
      </form>
    </div>
  );
}

export default WarehouseFormPage;
