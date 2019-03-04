import { action, createStandardAction } from 'typesafe-actions';
import IInvoice from '../../../../../../../shared/models/Invoice';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';

export enum FetchInvoicesTypes {
  FETCH_INVOICES_REQUEST = '@invoice-app/invoice/FETCH_INVOICES_REQUEST',
  FETCH_INVOICES_SUCCESS = '@invoice-app/invoice/FETCH_INVOICES_SUCCESS',
  FETCH_INVOICES_FAILURE = '@invoice-app/invoice/FETCH_INVOICES_FAILURE',
}

export const FetchInvoiceActions = {
  fetchAllInvoicesRequest: () =>
    action(FetchInvoicesTypes.FETCH_INVOICES_REQUEST, { url: URL_ALL_INVOICES }),
  fetchInvoicesSuccess: createStandardAction(FetchInvoicesTypes.FETCH_INVOICES_SUCCESS)<
    IInvoice[]
  >(),
  fetchInvoicesFailure: createStandardAction(FetchInvoicesTypes.FETCH_INVOICES_FAILURE)<
    Error
  >()
};