// Libraries
import { useEffect, useRef, useState } from "react";

// Components
import { ArrowDropDownIcon, ErrorIcon } from "../Icons/Icons";

// Types
import { FormDataProps, OptionProps } from "../../types";

// Styles
import "./InputDropdown.scss";

interface InputDropdownProps {
  label: string;
  fieldName: string;
  options: OptionProps[];
  formData: FormDataProps;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputDropdown({
  label,
  fieldName,
  options,
  formData,
  handleInputChange,
}: InputDropdownProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };

  const handleLabelClick = () => {
    const btn = dropdownRef.current?.querySelector(
      "div.dropdown__btn"
    ) as HTMLDivElement;
    btn.focus();
  };

  const handleOptionSelect = (value: string) => {
    const syntheticEvent = {
      target: {
        name: fieldName,
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(syntheticEvent);
    setShowOptions(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label
        id={fieldName}
        className="dropdown__label"
        onClick={handleLabelClick}
      >
        {label}
        <div
          className="dropdown__btn"
          tabIndex={0}
          role="button"
          aria-labelledby={fieldName}
          onClick={toggleDropdown}
          onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
          aria-placeholder="Please select"
        >
          <span className="dropdown__placeholder">
            {formData[fieldName]?.value || "Please select"}
          </span>
          <ArrowDropDownIcon />
        </div>
        {formData[fieldName].hasError && (
          <span className="form__error">
            <ErrorIcon size="16" />
            This field is required.
          </span>
        )}
      </label>

      <ul
        role="radiogroup"
        className="dropdown__options"
        aria-expanded={showOptions}
      >
        {options.length > 0 ? (
          options.map((option) => {
            return (
              <li
                key={option.id}
                role="radio"
                aria-checked={formData[fieldName]?.value === option.id}
                aria-label={option.value}
                data-value={option.value}
                className="dropdown__option"
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.value}
              </li>
            );
          })
        ) : (
          <li className="dropdown__message">
            No options available at the moment. Try again later!
          </li>
        )}
      </ul>
    </div>
  );
}

export default InputDropdown;
