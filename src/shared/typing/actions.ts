import ICustomer from "../models/Customer";
import IProduct from "../models/Product";
import IInvoice from "../models/Invoice";
import IInvoiceItem from "../models/InvoiceItem";

export type PayloadData = { url: string; body?: TModels };
export type TModels = ICustomer | IProduct | IInvoice | IInvoiceItem;
export type TErrorAction = { setError: (error: string) => void };
export type FetchActions = TErrorAction & {
  fetchDataSuccess: (data: any[]) => any;
};
export type FetchByIdActions = TErrorAction & {
  fetchDataByIdSuccess: (data: any) => any;
};
export type DeleteActions = TErrorAction & {
  deleteSuccess: (data: any) => any;
};
export type EditActions = TErrorAction & {
  editSuccess: (data: any) => any;
};
export type CreateActions = TErrorAction & {
  createSuccess: (data: any) => any;
};
