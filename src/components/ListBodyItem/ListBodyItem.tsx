// Libraries
import { Link } from "react-router-dom";

// Components
import { ChevronRightIcon, DeleteOutlineIcon, EditIcon } from "../Icons/Icons";
import Button from "../Button/Button";
import "./ListBodyItem.scss";

interface ListBodyLinkProps {
  className: string;
  title: string;
  content: string;
  linkTo: string;
}

interface ListBodyTextProps {
  className: string;
  title: string;
  content: string;
}

interface ListBodyActionsProps {
  className?: string;
  onDelete: () => void;
  onEdit: () => void;
}

function ListBodyLink({
  className,
  title,
  content,
  linkTo,
}: ListBodyLinkProps) {
  return (
    <div className={`list-body__item ${className}`}>
      <h4 className="list-body__title">{title}</h4>
      <Link
        to={`/${linkTo}`}
        className="list-body__content list-body__content--link"
      >
        {content} <ChevronRightIcon size="20" />
      </Link>
    </div>
  );
}

function ListBodyText({ className, title, content }: ListBodyTextProps) {
  return (
    <div className={`list-body__item ${className}`}>
      <h4 className="list-body__title">{title}</h4>
      <p className="list-body__content">{content}</p>
    </div>
  );
}

function ListBodyActions({
  className,
  onDelete,
  onEdit,
}: ListBodyActionsProps) {
  return (
    <div className={`list-body__item ${className}`}>
      <Button
        icon={<DeleteOutlineIcon />}
        className="btn--icon"
        handleClick={onDelete}
      />
      <Button icon={<EditIcon />} className="btn--icon" handleClick={onEdit} />
    </div>
  );
}

export { ListBodyLink, ListBodyText, ListBodyActions };
