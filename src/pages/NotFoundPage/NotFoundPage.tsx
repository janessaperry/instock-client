// Libraries
import { useNavigate } from "react-router-dom";

// Components
import Button from "../../components/Button/Button";
import ContainerHeader from "../../components/ContainerHeader/ContainerHeader";

// Styles
import "./NotFoundPage.scss";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <ContainerHeader title={"404 Not Found"} className="not-found__header" />

      <section className="not-found__content">
        <div className="not-found__wrapper">
          <h2 className="not-found__title">Sorry about this!</h2>
          <p className="not-found__message">
            Hmm, we couldn't find the page you're looking for.
          </p>
        </div>

        <Button
          className="btn--primary"
          label="Back to Home"
          handleClick={() => navigate("/")}
        />
      </section>
    </div>
  );
}

export default NotFoundPage;
