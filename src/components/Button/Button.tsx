import "./Button.scss";

interface ButtonProps {
  btnType?: "button" | "submit";
  label?: string;
  icon?: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}

function Button({
  btnType = "button",
  label,
  icon: Icon,
  handleClick,
  className,
}: ButtonProps) {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className={`btn ${className || ""}`}
    >
      {Icon && Icon}
      {label && <span className="btn__label">{label}</span>}
    </button>
  );
}

export default Button;
