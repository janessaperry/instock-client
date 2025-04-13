// Components
import { ErrorIcon } from "../Icons/Icons";

// Types
import { FormDataProps } from "../../types";

// Styles
import "./InputText.scss";

interface InputTextProps {
  label: string;
  fieldName: string;
  formData: FormDataProps;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputText({
  label,
  fieldName,
  formData,
  handleInputChange,
}: InputTextProps) {
  return (
    <label className="form__label">
      {label}
      <input
        type="text"
        className={`form__input-text ${
          formData[fieldName].hasError ? "form__input-text--error" : ""
        }`}
        placeholder={label}
        name={fieldName}
        value={formData[fieldName].value}
        onChange={handleInputChange}
      ></input>
      {formData[fieldName].hasError && (
        <span className="form__error">
          <ErrorIcon size="16" />
          This field is required.
        </span>
      )}
    </label>
  );
}

export default InputText;
