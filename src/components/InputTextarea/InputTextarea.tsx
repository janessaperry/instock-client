// Types
import { FormDataProps } from "../../types";
import { ErrorIcon } from "../Icons/Icons";

// Styles
import "./InputTextarea.scss";

interface InputTextareaProps {
  label: string;
  placeholder: string;
  fieldName: string;
  formData: FormDataProps;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function InputTextarea({
  label,
  placeholder,
  fieldName,
  formData,
  handleInputChange,
}: InputTextareaProps) {
  return (
    <label className="form__label">
      {label}
      <textarea
        className={`form__input-textarea ${
          formData[fieldName].hasError ? "form__input-textarea--error" : ""
        }`}
        placeholder={placeholder}
        rows={4}
        name={fieldName}
        value={formData[fieldName].value}
        onChange={handleInputChange}
      ></textarea>
      {formData[fieldName].hasError && (
        <span className="form__error">
          <ErrorIcon size="16" />
          This field is required.
        </span>
      )}
    </label>
  );
}

export default InputTextarea;
