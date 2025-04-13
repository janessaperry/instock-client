// Components
import { ErrorIcon } from "../Icons/Icons";

// Types
import { FormDataProps } from "../../types";

// Styles
import "./InputNumber.scss";

interface InputNumberProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  label: string;
  placeholder?: string;
  maxLength?: number;
  fieldName: string;
  inputMode: "numeric" | "tel";
  formData: FormDataProps;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function InputNumber({
  inputRef,
  label,
  placeholder,
  maxLength,
  fieldName,
  inputMode,
  formData,
  handleInputChange,
  handleInputFocus,
}: InputNumberProps) {
  return (
    <label className="form__label">
      {label}
      <input
        ref={inputRef ?? undefined}
        type="text"
        inputMode={inputMode}
        className={`form__input-text ${
          formData[fieldName].hasError ? "form__input-text--error" : ""
        }`}
        placeholder={placeholder || label}
        name={fieldName}
        value={formData[fieldName].value}
        maxLength={maxLength ?? undefined}
        onChange={handleInputChange}
        {...(handleInputFocus && { onFocus: handleInputFocus })}
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

export default InputNumber;
