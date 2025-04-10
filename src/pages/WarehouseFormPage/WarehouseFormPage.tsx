// Libraries
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";

// Components
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import InputNumber from "../../components/InputNumber/InputNumber";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";
import ModalSuccess from "../../components/ModalSuccess/ModalSuccess";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { ArrowBackIcon } from "../../components/Icons/Icons";

// Types & Services
import { ApiService } from "../../api/apiService";
import { WarehouseDetails, FormDataProps } from "../../types";
import { formatPhoneNumber, setCursorPosition } from "../../utils/utils";
import {
  validateBlankFields,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/formValidation";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPosition = useRef<any | null>({
    selectionStart: 0,
    selectionEnd: 0,
  });

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

  const [formData, setFormData] = useState<FormDataProps>(
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
    const { name, value, selectionStart, selectionEnd } = e.target;

    if (name === "contactPhone") {
      const formattedValue = formatPhoneNumber(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactPhone: {
          value: formattedValue,
          hasError: false,
        },
      }));

      const lengthDiff = formattedValue.length - value.length;
      setCursorPosition(
        cursorPosition,
        selectionStart! + lengthDiff,
        selectionEnd! + lengthDiff
      );
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: {
          value: value,
          hasError: false,
        },
      }));
    }
  };

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(
        cursorPosition.current.selectionStart,
        cursorPosition.current.selectionEnd
      );
    }
  }, [formData["contactPhone"].value]);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;

    if (!target.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactPhone: {
          value: "+1 ",
          hasError: false,
        },
      }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    isValid = validateBlankFields(formData, setFormData);

    if (isValid)
      isValid =
        validatePhoneNumber(formData, setFormData) &&
        validateEmail(formData, setFormData);

    if (!isValid) return;

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
    <div className="warehouse-form-container">
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

      <form className="warehouse-form" onSubmit={handleFormSubmit}>
        <section className="warehouse-form__section">
          <h2 className="warehouse-form__section-title">Warehouse Details</h2>

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

        <section className="warehouse-form__section">
          <h2 className="warehouse-form__section-title">Contact Details</h2>

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

          <InputNumber
            inputRef={inputRef}
            label="Phone Number"
            placeholder="+1 (555) 555-5555"
            maxLength={17}
            fieldName="contactPhone"
            inputMode="tel"
            formData={formData}
            handleInputChange={handleInputChange}
            handleInputFocus={handleInputFocus}
          />

          <InputText
            label="Email"
            fieldName="contactEmail"
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </section>

        <div className="warehouse-form__actions">
          <Button
            className="btn--secondary warehouse-form__btn"
            label="Cancel"
            handleClick={() => navigate(-1)}
          />
          <Button
            btnType="submit"
            className="btn--primary warehouse-form__btn"
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
