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

const errorTitles = [
  "Uh oh...",
  "Whoops!",
  "Yikes!",
  "Oopsie daisy!",
  "Something went wrong...",
];

const renderTitle = () => {
  let randomIndex = Math.floor(Math.random() * 5);
  return errorTitles[randomIndex];
};

function Error({ message }: ErrorProps) {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <ContainerHeader title={renderTitle()} />

      <section className="error-body">
        <p className="error-body__message">{message}</p>
        <Button
          className="btn--primary error-body__btn"
          label="Back to Home"
          handleClick={() => navigate("/")}
        />
      </section>
    </div>
  );
}

export default Error;
