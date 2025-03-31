// Libraries
import { useNavigate } from "react-router-dom";

// Components
import Button from "../Button/Button";
import ContainerHeader from "../ContainerHeader/ContainerHeader";

// Styles
import "./Error.scss";

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <ContainerHeader title="Uh oh..." />

      <section className="error-body">
        <p className="error-body__message">{message}</p>
        <Button
          className="btn--primary error-body__btn"
          label="Back"
          handleClick={() => navigate(-1)}
        />
      </section>
    </div>
  );
}

export default Error;
