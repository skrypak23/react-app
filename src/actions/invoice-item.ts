import { action, createStandardAction } from 'typesafe-actions';
import { INVOICE_ITEMS_TYPES } from '../types';
import IInvoiceItem from '../models/InvoiceItem';

export const fetchInvoices = createStandardAction(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST)<
  string
>();
export const fetchInvoicesSuccess = (invoices: IInvoiceItem[]) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST, invoices);

export const fetchInvoiceById = (id: string | number) =>
  action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST, id);
export const fetchInvoiceByIdSuccess = (invoice: IInvoiceItem) => (
  INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_SUCCESS, invoice
);
