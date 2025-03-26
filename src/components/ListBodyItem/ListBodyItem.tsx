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
  content: string | string[];
}

interface ListBodyChipProps {
  className: string;
  title: string;
  count: number;
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
        to={`${linkTo}`}
        className="list-body__content list-body__content--link"
      >
        {content} <ChevronRightIcon size="20" />
      </Link>
    </div>
  );
}

function ListBodyText({ className, title, content }: ListBodyTextProps) {
  const generateContent = (content: string | string[]) => {
    return typeof content === "string"
      ? content
      : content.map((item, index) => (
          <span key={index}>
            {item} {index !== content.length - 1 && <br />}
          </span>
        ));
  };

  return (
    <div className={`list-body__item ${className}`}>
      <h4 className="list-body__title">{title}</h4>
      <p className="list-body__content">{generateContent(content)}</p>
    </div>
  );
}

function ListBodyChip({ className, title, count, content }: ListBodyChipProps) {
  return (
    <div className={`list-body__item ${className}`}>
      <h4 className="list-body__title">{title}</h4>
      <p
        className={`list-body__chip list-body__chip${
          count === 0 ? "--out-of-stock" : "--in-stock"
        }`}
      >
        {content}
      </p>
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
        icon={<DeleteOutlineIcon size={"20"} />}
        className="btn--icon"
        handleClick={onDelete}
      />
      <Button
        icon={<EditIcon size={"20"} />}
        className="btn--icon"
        handleClick={onEdit}
      />
    </div>
  );
}

export { ListBodyLink, ListBodyText, ListBodyChip, ListBodyActions };
