import { action } from 'typesafe-actions';
import IInvoice from '../models/Invoice';
import { INVOICE_TYPES } from '../types';
import { URL_ALL_INVOICES } from '../api';

export const fetchInvoices = () =>
  action(INVOICE_TYPES.GET_INVOICES_REQUEST, URL_ALL_INVOICES);
export const fetchInvoicesSuccess = (invoices: IInvoice[]) =>
  action(INVOICE_TYPES.GET_INVOICES_SUCCESS, invoices);

export const fetchInvoiceById = (id: string | number) =>
  action(INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST, id);
export const fetchInvoiceByIdSuccess = (invoice: IInvoice) =>
  action(INVOICE_TYPES.GET_INVOICE_BY_ID_SUCCESS, invoice);

export const createInvoice = (invoice: IInvoice) =>
  action(INVOICE_TYPES.CREATE_INVOICE_REQUEST, invoice);
export const createInvoiceSuccess = () =>
  action(INVOICE_TYPES.CREATE_INVOICE_SUCCESS, 'success');

export const setError = (error: string) =>
  action(INVOICE_TYPES.FETCH_INVOICE_ERROR, error);
