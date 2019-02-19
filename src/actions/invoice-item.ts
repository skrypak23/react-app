import TYPES from '../types';
import IInvoiceItem from '../models/InvoiceItem';

export const fetchInvoices = () => ({ type: TYPES.INVOICE.GET_INVOICES_REQUEST });
export const fetchInvoicesSuccess = (invoices: IInvoiceItem[]) => ({
  type: TYPES.INVOICE_ITEMS.GET_INVOICE_ITEMS_REQUEST,
  payload: invoices
});

export const fetchInvoiceById = (id: string | number) => ({
  type: TYPES.INVOICE_ITEMS.GET_INVOICE_ITEMS_BY_ID_REQUEST,
  payload: id
});
export const fetchInvoiceByIdSuccess = (invoice: IInvoiceItem) => ({
  type: TYPES.INVOICE_ITEMS.GET_INVOICE_ITEMS_BY_ID_SUCCESS,
  payload: invoice
});
