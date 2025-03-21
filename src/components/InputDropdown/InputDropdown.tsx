// Libraries
import { useEffect, useState } from "react";

// Components
import { ArrowDropDownIcon } from "../Icons/Icons";

// Types
import { FormDataProps } from "../../types";

// Styles
import "./InputDropdown.scss";

interface InputDropdownProps {
  label: string;
  fieldName: string;
  options: {
    id: string;
    value: string;
  }[];
  formData: FormDataProps;
}

function InputDropdown({ label, fieldName, options }: InputDropdownProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropdownClick = () => {
    setShowOptions(!showOptions);
  };

  const handleLabelClick = () => {
    const btn = document.querySelector("div.dropdown__btn") as HTMLDivElement;
    btn.focus();
  };

  const handleDropdownSelection = (e: React.MouseEvent) => {
    const clickedOption = e.target as HTMLElement;

    if (clickedOption && clickedOption.hasAttribute("data-value")) {
      const selectedId = clickedOption.getAttribute("data-value");
      setSelectedOption(selectedId);
      setShowOptions(false);
    }
  };

  useEffect(() => {
    const dropdowns = Array.from(
      document.querySelectorAll("div.dropdown")
    ) as HTMLDivElement[];

    const handleClickOutside = (e: MouseEvent) => {
      const clickedTarget = e.target as HTMLElement;

      const isOutsideClick = !dropdowns.some((dropdown: HTMLDivElement) =>
        dropdown.contains(clickedTarget)
      );

      isOutsideClick && setShowOptions(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
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
          onClick={handleDropdownClick}
          onKeyDown={(e) => e.key === "Enter" && handleDropdownClick()}
          aria-placeholder="Please select"
        >
          <span className="dropdown__placeholder">Please select</span>
          <ArrowDropDownIcon />
        </div>
      </label>

      <ul
        role="radiogroup"
        className="dropdown__options"
        aria-expanded={showOptions}
      >
        {options.map((option) => {
          return (
            <li
              key={option.id}
              role="radio"
              aria-checked={selectedOption === option.id}
              aria-label={option.value}
              data-value={option.id}
              className="dropdown__option"
              onClick={(e) => handleDropdownSelection(e)}
            >
              {option.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default InputDropdown;
