import { action, createStandardAction } from 'typesafe-actions';
import IInvoice from '../../../../../../../shared/models/Invoice';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum FetchInvoiceByIdTypes {
  FETCH_INVOICE_BY_ID_REQUEST = '@invoice-app/invoice/FETCH_INVOICE_BY_ID_REQUEST',
  FETCH_INVOICE_BY_ID_SUCCESS = '@invoice-app/invoice/FETCH_INVOICE_BY_ID_SUCCESS',
  FETCH_INVOICE_BY_ID_FAILURE = '@invoice-app/invoice/FETCH_INVOICE_BY_ID_FAILURE'
}

export const FetchInvoiceByIdActions = {
  fetchInvoiceById: (id: ID) =>
    action(
      FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_REQUEST,
        { url: `${URL_ALL_INVOICES}/${id}` }
    ),
  fetchInvoiceByIdSuccess: createStandardAction(
    FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_SUCCESS
  )<IInvoice>(),
  fetchInvoiceByIdFailure: createStandardAction(
    FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_FAILURE
  )<Error>()
};
