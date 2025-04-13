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

  const handleOptionNav = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const target = e.target;
    const nextOption = (target as HTMLElement).nextElementSibling;
    const prevOption = (target as HTMLElement).previousElementSibling;

    if (e.key === "ArrowDown") (nextOption as HTMLElement)?.focus();
    if (e.key === "ArrowUp") (prevOption as HTMLElement)?.focus();
    if (e.key === "Escape" || (e.key === "Tab" && nextOption === null))
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
    if (showOptions) {
      const first = dropdownRef.current?.querySelector(
        ".dropdown__option"
      ) as HTMLElement;
      first.focus();
    }
  }, [showOptions]);

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
      </label>
      <div
        className={`dropdown__btn ${
          formData[fieldName].hasError ? "dropdown__btn--error" : ""
        }`}
        role="button"
        tabIndex={0}
        aria-labelledby={fieldName}
        aria-placeholder="Please select"
        aria-expanded={showOptions}
        aria-controls={`radio-${fieldName}`}
        onClick={toggleDropdown}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
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

      <ul
        id={`radio-${fieldName}`}
        role="radiogroup"
        className={`dropdown__options dropdown__options--${
          showOptions ? "expanded" : "collapsed"
        }`}
        aria-labelledby={fieldName}
      >
        {options.length > 0 ? (
          options.map((option) => {
            return (
              <li
                key={option.id}
                role="radio"
                tabIndex={0}
                aria-checked={formData[fieldName]?.value === option.id}
                className="dropdown__option"
                onClick={() => handleOptionSelect(option.value)}
                onKeyDown={(e) => {
                  handleOptionNav(e);
                  if (e.key === "Enter") handleOptionSelect(option.value);
                }}
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
