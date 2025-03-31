// Libraries
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";

// Components
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { ArrowBackIcon } from "../../components/Icons/Icons";

// Types & Services
import { ApiService } from "../../api/apiService";
import { WarehouseDetails, WarehouseFormData } from "../../types";

// Styles
import "./WarehouseFormPage.scss";

interface WarehousesFormPageProps {
  editMode: boolean;
}

function WarehouseFormPage({ editMode }: WarehousesFormPageProps) {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const { warehouseId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [existingWarehouseDetails, setExistingWarehouseDetails] =
    useState<WarehouseDetails>({} as WarehouseDetails);

  const formDataObject = (warehouseObject: WarehouseDetails) => ({
    warehouseName: {
      value: warehouseObject?.warehouse_name || "",
      hasError: false,
    },
    address: {
      value: warehouseObject?.address || "",
      hasError: false,
    },
    city: {
      value: warehouseObject?.city || "",
      hasError: false,
    },
    country: {
      value: warehouseObject?.country || "",
      hasError: false,
    },
    contactName: {
      value: warehouseObject?.contact_name || "",
      hasError: false,
    },
    contactPosition: {
      value: warehouseObject?.contact_position || "",
      hasError: false,
    },
    contactPhone: {
      value: warehouseObject?.contact_phone || "",
      hasError: false,
    },
    contactEmail: {
      value: warehouseObject?.contact_email || "",
      hasError: false,
    },
  });

  const [formData, setFormData] = useState<WarehouseFormData>(
    formDataObject(existingWarehouseDetails)
  );

  const getWarehouseDetails = async () => {
    try {
      const data = await apiService.getById("warehouses", Number(warehouseId));
      const warehouseDetailsData = data;
      setExistingWarehouseDetails(warehouseDetailsData);
      setFormData(formDataObject(warehouseDetailsData));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const addNewWarehouse = async (newWarehouse: Object) => {
    try {
      await apiService.add("warehouses", newWarehouse);
      setShowModal(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editExistingWarehouse = async (updatedWarehouse: Object) => {
    try {
      await apiService.edit(
        "warehouses",
        Number(warehouseId),
        updatedWarehouse
      );
      setShowModal(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    editMode && getWarehouseDetails();
    setIsLoading(false);
  }, [warehouseId]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="form-container">
      <ContainerHeader
        title={`${editMode ? "Edit" : "Add New"} Warehouse`}
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
          <h2 className="form__section-title">Warehouse Details</h2>

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
          <h2 className="form__section-title">Contact Details</h2>

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

        <div className="form__actions">
          <Button
            className="btn--secondary form__btn"
            label="Cancel"
            handleClick={() => navigate(-1)}
          />
          <Button
            btnType="submit"
            className="btn--primary form__btn"
            label={`${editMode ? "Save" : "Add New Warehouse"}`}
          />
        </div>
      </form>
      {showModal &&
        createPortal(
          <ModalSuccess
            type={"warehouse"}
            nameValue={formData.warehouseName.value}
            editMode={editMode}
            showModal={showModal}
            setShowModal={setShowModal}
            onDone={() => navigate("/warehouses")}
          />,
          document.querySelector<HTMLElement>(".form-container") ||
            document.body
        )}
    </div>
  );
}

export default WarehouseFormPage;
