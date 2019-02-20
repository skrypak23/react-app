import { action } from 'typesafe-actions';
import IInvoiceItem from '../models/InvoiceItem';
import { INVOICE_ITEMS_TYPES } from '../types';
import { URL_ALL_INVOICE_ITEMS } from '../api';

export const fetchData = () =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST, URL_ALL_INVOICE_ITEMS);
export const fetchDataSuccess = (invoices: IInvoiceItem[]) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST, invoices);

export const fetchDataById = (id: string | number) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST, id);
export const fetchDataByIdSuccess = (invoice: IInvoiceItem) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_SUCCESS, invoice);

export const createRequest = (body: IInvoiceItem) =>
  action(INVOICE_ITEMS_TYPES.CREATE_INVOICE_REQUEST, body);
export const createSuccess = (invoice: IInvoiceItem) =>
  action(INVOICE_ITEMS_TYPES.CREATE_INVOICE_SUCCESS, invoice);

export const setError = (error: string) =>
  action(INVOICE_ITEMS_TYPES.FETCH_INVOICE_ITEMS_ERROR, error);
