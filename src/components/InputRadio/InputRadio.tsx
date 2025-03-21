// Styles
import { useState } from "react";
import { FormDataProps } from "../../types";
import { ErrorIcon } from "../Icons/Icons";
import "./InputRadio.scss";

interface InputRadioProps {
  label: string;
  fieldName: string;
  options: {
    id: string;
    value: string;
  }[];
  formData: FormDataProps;
}

function InputRadio({ label, fieldName, options, formData }: InputRadioProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedTarget = e.target;
    setSelectedOption(clickedTarget.value);
  };

  return (
    <div className="input-radio">
      {label}
      <div className="input-radio__options">
        {options.map((option) => {
          return (
            <label key={option.id} className="input-radio__label">
              <input
                className="input-radio__input"
                type="radio"
                name={fieldName}
                value={option.id}
                checked={selectedOption === option.id}
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
