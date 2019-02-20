import { action } from 'typesafe-actions';
import IInvoiceItem from '../models/InvoiceItem';
import { INVOICE_ITEMS_TYPES } from '../types';
import { URL_ALL_INVOICE_ITEMS } from '../api';

export const fetchInvoices = () =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST, URL_ALL_INVOICE_ITEMS);
export const fetchInvoicesSuccess = (invoices: IInvoiceItem[]) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST, invoices);

export const fetchInvoiceById = (id: string | number) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST, id);
export const fetchInvoiceByIdSuccess = (invoice: IInvoiceItem) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_SUCCESS, invoice);

export const setError = (error: string) =>
  action(INVOICE_ITEMS_TYPES.FETCH_INVOICE_ITEMS_ERROR, error);
