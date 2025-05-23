// Components
import { ErrorIcon } from "../Icons/Icons";

// Types
import { FormDataProps, OptionProps } from "../../types";

// Styles
import "./InputRadio.scss";

interface InputRadioProps {
  label: string;
  fieldName: string;
  options: OptionProps[];
  formData: FormDataProps;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputRadio({
  label,
  fieldName,
  options,
  formData,
  handleInputChange,
}: InputRadioProps) {
  return (
    <div
      className="input-radio"
      role="radiogroup"
      aria-labelledby={`${fieldName}-group`}
    >
      <p id={`${fieldName}-group`} className="input-radio__legend">
        {label}
      </p>
      <div className="input-radio__options">
        {options.map((option) => {
          return (
            <label key={option.id} className="input-radio__label">
              <input
                className="input-radio__input"
                type="radio"
                name={fieldName}
                value={option.value}
                checked={formData[fieldName].value === option.value}
                onChange={handleInputChange}
              />
              {option.value}
            </label>
          );
        })}
      </div>
      {formData[fieldName].hasError && (
        <span className="form__error">
          <ErrorIcon size="16" />
          This field is required.
        </span>
      )}
    </div>
  );
}

export default InputRadio;
