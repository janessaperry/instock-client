import "./Button.scss";

interface ButtonProps {
  btnType?: "button" | "submit";
  label?: string;
  icon?: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  btnClasses?: string;
}

function Button({
  btnType = "button",
  label,
  icon: Icon,
  handleClick,
  btnClasses,
}: ButtonProps) {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className={`btn ${btnClasses}`}
    >
      {Icon && Icon}
      {label}
    </button>
  );
}

export default Button;
