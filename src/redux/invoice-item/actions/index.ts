import { action, createStandardAction } from 'typesafe-actions';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import { ID } from '../../../shared/typing/records';
import * as INVOICE_ITEMS_TYPES from './types';
import { URL_ALL_INVOICES } from '../../../shared/api';

export const fetchAllInvoiceItems = (invoiceId: ID) =>
  action(
    INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST,
    `${URL_ALL_INVOICES}/${invoiceId}/items`
  );
export const fetchDataSuccess = createStandardAction(
  INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_SUCCESS
)<IInvoiceItem[]>();

export const fillItems = createStandardAction(
  INVOICE_ITEMS_TYPES.FILL_INVOICE_ITEMS
)<IInvoiceItem>();

export const fetchInvoiceItemById = (id: ID, invoiceId: ID) =>
  action(
    INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST,
    `${URL_ALL_INVOICES}/${invoiceId}/items${id}`
  );
export const fetchDataByIdSuccess = createStandardAction(
  INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_SUCCESS
)<IInvoiceItem>();

export const createInvoiceItem = (id: ID, invoice: IInvoiceItem) =>
  action(INVOICE_ITEMS_TYPES.CREATE_INVOICE_ITEMS_REQUEST, {
    url: `${URL_ALL_INVOICES}/${id}/items`,
    body: invoice
  });
export const createSuccess = createStandardAction(
  INVOICE_ITEMS_TYPES.CREATE_INVOICE_ITEMS_SUCCESS
)<IInvoiceItem>();

export const editInvoiceItem = (
  id: ID,
  invoiceId: ID,
  invoice: IInvoiceItem[]
) => () =>
  action(INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_REQUEST, {
    url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`,
    body: invoice
  });
export const editSuccess = createStandardAction(
  INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_SUCCESS
)<IInvoiceItem>();

export const deleteInvoiceItem = (id: ID, invoiceId: ID) =>
  action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_REQUEST, {
    url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`
  });
export const deleteInvoiceItemLocal = (id: ID) =>
  action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL, id);
export const deleteSuccess = createStandardAction(
  INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_SUCCESS
)<IInvoiceItem>();

export const resetInvoiceItem = createStandardAction(
  INVOICE_ITEMS_TYPES.RESET_INVOICE_ITEMS
)<undefined>();
export const setError = createStandardAction(
  INVOICE_ITEMS_TYPES.FETCH_INVOICE_ITEMS_ERROR
)<string>();
