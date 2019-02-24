import { action } from "typesafe-actions";
import IInvoice from "../models/Invoice";
import { INVOICE_TYPES } from "../types";
import { URL_ALL_INVOICES } from "../api";
import { ID } from "../common/types";

export const fetchAllInvoices = () =>
  action(INVOICE_TYPES.GET_INVOICES_REQUEST, URL_ALL_INVOICES);
export const fetchDataSuccess = (invoices: IInvoice[]) =>
  action(INVOICE_TYPES.GET_INVOICES_SUCCESS, invoices);

export const fetchInvoiceById = (id: ID) =>
  action(INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST, `${URL_ALL_INVOICES}/${id}`);
export const fetchDataByIdSuccess = (customer: IInvoice) =>
  action(INVOICE_TYPES.GET_INVOICE_BY_ID_SUCCESS, customer);

export const createInvoice = (invoice: IInvoice) =>
  action(INVOICE_TYPES.CREATE_INVOICE_REQUEST, {
    url: URL_ALL_INVOICES,
    body: invoice
  });
export const createSuccess = (invoice: IInvoice) =>
  action(INVOICE_TYPES.CREATE_INVOICE_SUCCESS, invoice);

export const editInvoice = (id: ID, invoice: IInvoice) =>
  action(INVOICE_TYPES.EDIT_INVOICE_REQUEST, {
    url: `${URL_ALL_INVOICES}/${id}`,
    body: invoice
  });
export const editSuccess = (invoice: IInvoice) =>
  action(INVOICE_TYPES.EDIT_INVOICE_SUCCESS, invoice);

export const deleteInvoice = (id: ID) =>
  action(INVOICE_TYPES.DELETE_INVOICE_REQUEST, {
    url: `${URL_ALL_INVOICES}/${id}`
  });
export const deleteSuccess = (invoice: IInvoice) =>
  action(INVOICE_TYPES.DELETE_INVOICE_SUCCESS, invoice);

export const resetInvoice = () => action(INVOICE_TYPES.RESET_INVOICE, "reset");
export const fillInvoice = (invoice: IInvoice) =>
  action(INVOICE_TYPES.FILL_INVOICE, invoice);

export const setError = (error: string) =>
  action(INVOICE_TYPES.FETCH_INVOICE_ERROR, error);
