import {action, createStandardAction} from 'typesafe-actions';
import * as INVOICE_TYPES from '../../invoice/actions/types';
import IInvoice from "../../../shared/models/Invoice";

export const setInvoiceData = createStandardAction(INVOICE_TYPES.SET_INVOICE_DATA)<
  IInvoice[]
>();

export const deleteInvoiceData = createStandardAction(INVOICE_TYPES.DELETE_INVOICE_DATA)<
  IInvoice
>();

export const createInvoice = createStandardAction(INVOICE_TYPES.CREATE_INVOICE)<
    IInvoice
    >();
export const editInvoice = (id: number, invoice: IInvoice) =>
    action(INVOICE_TYPES.EDIT_INVOICE, { id, invoice });
export const deleteInvoice = createStandardAction(INVOICE_TYPES.DELETE_INVOICE)<
    number
    >();
export const fetchInvoices = createStandardAction(INVOICE_TYPES.FETCH_INVOICES)<
    undefined
    >();
export const fetchInvoice = createStandardAction(INVOICE_TYPES.FETCH_INVOICE)<
    number
    >();