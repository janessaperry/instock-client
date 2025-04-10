export interface WarehouseDetails {
  id: number;
  warehouse_name: string;
  address: string;
  city: string;
  country: string;
  contact_name: string;
  contact_position: string;
  contact_phone: string;
  contact_email: string;
}

export interface InventoryItemDetailsProps {
  id: number;
  itemName: string;
  description: string;
  category: string;
  status: string;
  quantity: string;
  warehouseName: string;
}

export interface FormDataProps {
  [key: string]: {
    value: string;
    hasError: boolean;
  };
}

export interface DeletedRecordProps {
  id: number;
  name: string;
}

export interface OptionProps {
  id: string;
  value: string;
}
