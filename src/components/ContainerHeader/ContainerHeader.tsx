import "./ContainerHeader.scss";

interface ContainerHeaderProps {
  title: string;
  prevBtn?: React.ReactNode;
  button?: React.ReactNode;
  search?: React.ReactNode;
  className?: string;
}

function ContainerHeader({
  title,
  prevBtn: PrevBtn,
  button: Button,
  search: Search,
  className,
}: ContainerHeaderProps) {
  return (
    <header className={`container-header ${className || ""}`}>
      <div className="container-header__title-wrapper">
        {PrevBtn && PrevBtn}
        <h1 className="container-header__title">{title}</h1>
      </div>

      {(Button || Search) && (
        <div className="container-header__actions">
          {Search && Search}
          {Button && Button}
        </div>
      )}
    </header>
  );
}

export default ContainerHeader;
