import { ReactNode } from "react";
import "./ListHeaderItem.scss";

interface ListHeaderItemProps {
  className?: string;
  icon?: ReactNode;
  label: string;
}

function ListHeaderItem({ className, icon: Icon, label }: ListHeaderItemProps) {
  return (
    <div className={`list-header__item ${className}`}>
      <h4 className="list-header__title">{label}</h4>
      {Icon && Icon}
    </div>
  );
}

export default ListHeaderItem;
