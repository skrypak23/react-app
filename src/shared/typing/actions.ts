import ICustomer from "../models/Customer";
import IProduct from "../models/Product";
import IInvoice from "../models/Invoice";
import IInvoiceItem from "../models/InvoiceItem";

export type FetchActions = { fetchDataSuccess: Function; setError: Function };
export type FetchByIdActions = { fetchDataByIdSuccess: Function; setError: Function; };
export type DeleteActions = { deleteSuccess: Function; setError: Function };
export type EditActions = { editSuccess: Function; setError: Function };
export type CreateActions = { createSuccess: Function; setError: Function };
export type PayloadData = { url: string; body?: ICustomer | IProduct | IInvoice | IInvoiceItem };
