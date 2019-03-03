import { createStandardAction, action } from 'typesafe-actions';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import * as INVOICE_ITEMS_TYPES from './types';
import { ID } from '../../../shared/typing/records';

export const setInvoiceItemData = createStandardAction(
  INVOICE_ITEMS_TYPES.SET_INVOICE_ITEM_DATA
)<IInvoiceItem[]>();

export const deleteInvoiceItemData = createStandardAction(
  INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEM
)<IInvoiceItem>();

export const deleteInvoiceItemLocal = (id: ID) =>
  action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL, id);

export const editInvoiceItemLocal = (id: ID, invoiceItem: IInvoiceItem) =>
  action(INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_LOCAL, { id, invoiceItem });
export const addInvoiceItem = createStandardAction(INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM)<
  IInvoiceItem
>();
