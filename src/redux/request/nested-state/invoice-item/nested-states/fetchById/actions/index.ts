import { action, createStandardAction } from 'typesafe-actions';
import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';
import * as INVOICE_ITEMS_TYPES from '../../../../../../invoice-item/actions/types';

export enum FetchInvoiceItemByIdTypes {
  FETCH_INVOICE_ITEM_BY_ID_REQUEST = '@invoice-app/invoice-item/FETCH_INVOICE_ITEM_BY_ID_REQUEST',
  FETCH_INVOICE_ITEM_BY_ID_SUCCESS = '@invoice-app/invoice-item/FETCH_INVOICE_ITEM_BY_ID_SUCCESS',
  FETCH_INVOICE_ITEM_BY_ID_FAILURE = '@invoice-app/invoice-item/FETCH_INVOICE_ITEM_BY_ID_FAILURE'
}

export const FetchInvoiceItemByIdActions = {
  fetchInvoiceItemById: (id: ID, invoiceId: ID) =>
    action(FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_REQUEST, {
      url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`
    }),
  fetchInvoiceItemByIdSuccess: createStandardAction(
    FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_SUCCESS
  )<IInvoiceItem>(),
  fetchInvoiceItemByIdFailure: createStandardAction(
    FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_FAILURE
  )<Error>()
};
