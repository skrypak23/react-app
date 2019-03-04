import { action, createStandardAction } from 'typesafe-actions';
import IInvoice from '../../../../../../../shared/models/Invoice';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum FetchInvoiceByIdTypes {
  FETCH_INVOICE_BY_ID_REQUEST = '@invoice-app/invoice/FETCH_INVOICE_BY_ID_REQUEST',
  FETCH_INVOICE_BY_ID_SUCCESS = '@invoice-app/invoice/FETCH_INVOICE_BY_ID_SUCCESS',
  FETCH_INVOICE_BY_ID_FAILURE = '@invoice-app/invoice/FETCH_INVOICE_BY_ID_FAILURE',
  CALCULATE_TOTAL = '@invoice-app/invoice/CALCULATE_TOTAL',
  RESET_INVOICE = '@invoice-app/invoice/RESET_INVOICE',
  FILL_INVOICE = '@invoice-app/invoice/FILL_INVOICE'
}

export const FetchInvoiceByIdActions = {
  fetchInvoiceByIdRequest: (id: ID) =>
    action(FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_REQUEST, {
      url: `${URL_ALL_INVOICES}/${id}`
    }),
  fetchInvoiceByIdSuccess: createStandardAction(
    FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_SUCCESS
  )<IInvoice>(),
  resetInvoice: createStandardAction(FetchInvoiceByIdTypes.RESET_INVOICE)<undefined>(),
  fillInvoice: createStandardAction(FetchInvoiceByIdTypes.FILL_INVOICE)<IInvoice>(),
  calculateTotal: createStandardAction(FetchInvoiceByIdTypes.CALCULATE_TOTAL)<number>(),
  fetchInvoiceByIdFailure: createStandardAction(
    FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_FAILURE
  )<Error>()
};
