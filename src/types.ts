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

export interface WarehouseFormData {
  [key: string]: {
    value: string;
    hasError: boolean;
  };
}

export interface DeletedRecordProps {
  id: number;
  name: string;
}