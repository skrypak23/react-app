import TYPES from '../types';
import IInvoice from '../models/Invoice';

export const fetchInvoices = () => ({ type: TYPES.INVOICE.GET_INVOICES_REQUEST });
export const fetchInvoicesSuccess = (invoices: IInvoice[]) => ({
  type: TYPES.INVOICE.GET_INVOICES_SUCCESS,
  payload: invoices
});

export const fetchInvoiceById = (id: string | number) => ({
  type: TYPES.INVOICE.GET_INVOICE_BY_ID_REQUEST,
  payload: id
});
export const fetchInvoiceByIdSuccess = (invoice: IInvoice) => ({
  type: TYPES.INVOICE.GET_INVOICE_BY_ID_SUCCESS,
  payload: invoice
});
