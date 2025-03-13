import Button from "../Button/Button";
import { SearchIcon } from "../Icons/Icons";
import "./InputSearch.scss";

interface InputSearchProps {
  bemClasses?: string;
  placeholder?: string;
}

function InputSearch({ bemClasses, placeholder }: InputSearchProps) {
  return (
    <div className={`search ${bemClasses || ""}`}>
      <input className="search__input" type="text" placeholder={placeholder} />
      <Button icon={<SearchIcon />} className="btn--icon search__btn" />
    </div>
  );
}

export default InputSearch;
