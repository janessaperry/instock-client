// Types
import { FormDataProps } from "../../types";

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
        className="form__input-textarea"
        placeholder={placeholder}
        rows={4}
        name={fieldName}
        value={formData[fieldName].value}
        onChange={handleInputChange}
      ></textarea>
    </label>
  );
}

export default InputTextarea;
