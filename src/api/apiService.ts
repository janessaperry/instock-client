import axios from "axios";

interface IApiService {
  getAll(endpoint: string): Promise<any>;
  getById(endpoint: string, id: number): Promise<any>;
  edit<T>(endpoint: string, id: number, data: T): Promise<any>;
  add<T>(endpoint: string, data: T): Promise<any>;
  delete(endpoint: string, id: number): Promise<any>;
}

interface IErrorMessageMap {
  [route: string]: Record<number, string>;
}

const errorMessageMap: IErrorMessageMap = {
  warehouses: {
    400: "Bad Request: update this",
    404: "Warehouse not found. Please try again.",
    429: "Too many requests! You've hit the limit for write actions. As this is a portfolio project, I'm limiting the number of requests to prevent overloading. Please try again later!",
    500: "Something went wrong on our end. We're working to fix it.",
  },
  inventories: {
    400: "Bad Request: update this",
    404: "Inventory not found. Please try again.",
    429: "Too many requests! You've hit the limit for write actions. As this is a portfolio project, I'm limiting the number of requests to prevent overloading. Please try again later!",
    500: "Something went wrong on our end. We're working to fix it.",
  },
  default: {
    400: "Bad Request: update this",
    404: "Sorry, we couldn't find what you were looking for! Please try again.",
    429: "Too many requests! You've hit the limit for write actions. As this is a portfolio project, I'm limiting the number of requests to prevent overloading. Please try again later!",
    500: "Something went wrong on our end. We're working to fix it.",
  },
};

const baseApiUrl: string =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export class ApiService implements IApiService {
  async getAll(endpoint: string) {
    try {
      const response = await axios.get(`${baseApiUrl}/${endpoint}`);
      return response.data;
    } catch (error: any) {
      const route = errorMessageMap[endpoint] ? endpoint : "default";
      throw new Error(errorMessageMap[route][error.status]);
    }
  }

  async getById(endpoint: string, id: number) {
    try {
      const response = await axios.get(`${baseApiUrl}/${endpoint}/${id}`);
      return response.data;
    } catch (error: any) {
      const route = errorMessageMap[endpoint] ? endpoint : "default";
      throw new Error(errorMessageMap[route][error.status]);
    }
  }

  async edit<T>(endpoint: string, id: number, data: T) {
    try {
      await axios.put(`${baseApiUrl}/${endpoint}/${id}/edit`, data);
    } catch (error: any) {
      const route = errorMessageMap[endpoint] ? endpoint : "default";
      throw new Error(errorMessageMap[route][error.status]);
    }
  }

  async add<T>(endpoint: string, data: T) {
    try {
      await axios.post(`${baseApiUrl}/${endpoint}/add`, data);
    } catch (error: any) {
      const route = errorMessageMap[endpoint] ? endpoint : "default";
      throw new Error(errorMessageMap[route][error.status]);
    }
  }

  async delete(endpoint: string, id: number) {
    try {
      await axios.delete(`${baseApiUrl}/${endpoint}/${id}`);
    } catch (error: any) {
      const route = errorMessageMap[endpoint] ? endpoint : "default";
      throw new Error(errorMessageMap[route][error.status]);
    }
  }

  async getInventoryByWarehouseId(endpoint: string, id: number) {
    try {
      const response = await axios.get(
        `${baseApiUrl}/${endpoint}/${id}/inventories`
      );
      return response.data;
    } catch (error: any) {
      const route = errorMessageMap[endpoint] ? endpoint : "default";
      throw new Error(errorMessageMap[route][error.status]);
    }
  }

  async getCategories(endpoint: string) {
    try {
      const response = await axios.get(`${baseApiUrl}/${endpoint}/categories`);
      return response.data;
    } catch (error: any) {
      const route = errorMessageMap[endpoint] ? endpoint : "default";
      throw new Error(errorMessageMap[route][error.status]);
    }
  }
}
