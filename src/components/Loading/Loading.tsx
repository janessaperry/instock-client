// Components
import ContainerHeader from "../ContainerHeader/ContainerHeader";

// Styles
import "./Loading.scss";

function Loading() {
  return (
    <div className="loading-container">
      <ContainerHeader title="Loading" />

      <section className="loading-body">
        <p>One second while we fetch the data!</p>
      </section>
    </div>
  );
}

export default Loading;
