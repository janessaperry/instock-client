import { FormDataProps } from "../types";

export const validateBlankFields = (
  formData: FormDataProps,
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>
) => {
  let validated = true;
  Object.keys(formData).forEach((key) => {
    if (formData[key].value.trim().length === 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: {
          ...prevFormData[key],
          hasError: true,
        },
      }));
      validated = false;
    }
  });
  return validated;
};

export const validatePhoneNumber = (
  formData: FormDataProps,
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>
) => {
  let validated = true;
  const phoneRegEx = new RegExp(/^\+1 \(\d{3}\) \d{3}-\d{4}$/);
  const phoneNumber = formData.contactPhone.value;

  if (!phoneRegEx.test(phoneNumber)) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contactPhone: {
        ...prevFormData["contactPhone"],
        hasError: true,
      },
    }));
    validated = false;
  }
  return validated;
};

export const validateEmail = (
  formData: FormDataProps,
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>
) => {
  let validated = true;
  const emailRegEx = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  const email = formData.contactEmail.value;

  if (!emailRegEx.test(email)) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contactEmail: {
        ...prevFormData["contactEmail"],
        hasError: true,
      },
    }));
    validated = false;
  }
  return validated;
};
