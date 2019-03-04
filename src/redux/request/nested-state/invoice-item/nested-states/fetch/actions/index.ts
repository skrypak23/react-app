import { action, createStandardAction } from 'typesafe-actions';
import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum FetchInvoiceItemsTypes {
  FETCH_INVOICE_ITEMS_REQUEST = '@invoice-app/invoice-item/FETCH_INVOICE_ITEMS_REQUEST',
  FETCH_INVOICE_ITEMS_SUCCESS = '@invoice-app/invoice-item/FETCH_INVOICE_ITEMS_SUCCESS',
  FETCH_INVOICE_ITEMS_FAILURE = '@invoice-app/invoice-item/FETCH_INVOICE_ITEMS_FAILURE'
}

export const FetchInvoiceItemActions = {
  fetchAllInvoiceItemsRequest: (invoiceId: ID) =>
    action(FetchInvoiceItemsTypes.FETCH_INVOICE_ITEMS_REQUEST, {
      url: `${URL_ALL_INVOICES}/${invoiceId}/items`
    }),
  fetchInvoiceItemsSuccess: createStandardAction(
    FetchInvoiceItemsTypes.FETCH_INVOICE_ITEMS_SUCCESS
  )<IInvoiceItem[]>(),
  fetchInvoiceItemsFailure: createStandardAction(
    FetchInvoiceItemsTypes.FETCH_INVOICE_ITEMS_FAILURE
  )<Error>()
};
