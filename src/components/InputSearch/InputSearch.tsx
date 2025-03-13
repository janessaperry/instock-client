import "./InputSearch.scss";

interface InputSearchProps {
  bemClasses?: string;
  placeholder?: string;
}

function InputSearch({ bemClasses, placeholder }: InputSearchProps) {
  return (
    <input
      className={`search-input ${bemClasses}`}
      type="text"
      placeholder={placeholder}
    />
  );
}

export default InputSearch;
