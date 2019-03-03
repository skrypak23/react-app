import { createStandardAction } from 'typesafe-actions';
import * as INVOICE_TYPES from '../../invoice/actions/types';
import IInvoice from '../../../shared/models/Invoice';

export const setInvoiceData = createStandardAction(INVOICE_TYPES.SET_INVOICE_DATA)<
  IInvoice[]
>();

export const deleteInvoiceData = createStandardAction(INVOICE_TYPES.DELETE_INVOICE)<
  IInvoice
>();

