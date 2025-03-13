import "./ContainerHeader.scss";

interface ContainerHeaderProps {
  title: string;
  button?: React.ReactNode;
  search?: React.ReactNode;
  className?: string;
}

function ContainerHeader({
  title,
  button: Button,
  search: Search,
  className,
}: ContainerHeaderProps) {
  return (
    <header className={`container-header ${className || ""}`}>
      <h1 className="container-header__title">{title}</h1>

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
