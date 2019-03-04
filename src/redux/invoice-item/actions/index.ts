import { createStandardAction, action } from 'typesafe-actions';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import * as INVOICE_ITEMS_TYPES from './types';
import { ID } from '../../../shared/typing/records';

export const setInvoiceItemData = createStandardAction(
  INVOICE_ITEMS_TYPES.SET_INVOICE_ITEM_DATA
)<IInvoiceItem[]>();

export const deleteInvoiceItemData = createStandardAction(
  INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEM_LOCAL
)<IInvoiceItem>();

export const deleteInvoiceItemLocal = (id: ID) =>
  action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEM_LOCAL, id);

export const resetInvoiceItems = createStandardAction(
  INVOICE_ITEMS_TYPES.RESET_INVOICE_ITEMS
)<undefined>();

export const editInvoiceItemLocal = (index: ID, invoiceItem: IInvoiceItem) =>
  action(INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEM_LOCAL, { index, invoiceItem });
export const addInvoiceItem = createStandardAction(INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM)<
  IInvoiceItem
>();

export const deleteInvoiceItem = (invoiceItemId: ID, invoiceId: ID) =>
  action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEM, {
    invoiceId,
    invoiceItemId
  });
export const fetchInvoiceItems = (invoiceId: ID) =>
  action(INVOICE_ITEMS_TYPES.FETCH_INVOICE_ITEMS, {
    invoiceId
  });

export const fetchInvoiceItem = (invoiceItemId: ID, invoiceId: ID) =>
  action(INVOICE_ITEMS_TYPES.FETCH_INVOICE_ITEM, {
    invoiceItemId,
    invoiceId
  });

export const editInvoiceItem = (
  invoiceItemId: ID,
  invoiceId: ID,
  invoice: IInvoiceItem
) =>
  action(INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEM, {
    invoiceItemId,
    invoiceId,
    invoice
  });
