// Components
import Button from "../Button/Button";
import { SearchIcon } from "../Icons/Icons";

// Styles
import "./InputSearch.scss";

interface InputSearchProps {
  className?: string;
  placeholder?: string;
}

function InputSearch({ className, placeholder }: InputSearchProps) {
  return (
    <div className={`search ${className || ""}`}>
      <input className="search__input" type="text" placeholder={placeholder} />
      <Button icon={<SearchIcon />} className="btn--icon search__btn" />
    </div>
  );
}

export default InputSearch;
