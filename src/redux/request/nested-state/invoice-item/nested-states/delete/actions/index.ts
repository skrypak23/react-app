import { action, createStandardAction } from 'typesafe-actions';
import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum DeleteInvoiceItemTypes {
  DELETE_INVOICE_ITEM_REQUEST = '@invoice-app/invoice-item/DELETE_INVOICE_ITEM_REQUEST',
  DELETE_INVOICE_ITEM_SUCCESS = '@invoice-app/invoice-item/DELETE_INVOICE_ITEM_SUCCESS',
  DELETE_INVOICE_ITEM_FAILURE = '@invoice-app/invoice-item/DELETE_INVOICE_ITEM_FAILURE'
}

export const DeleteInvoiceItemActions = {
  deleteInvoiceItemRequest: (id: ID, invoiceId: ID) =>
    action(DeleteInvoiceItemTypes.DELETE_INVOICE_ITEM_REQUEST, {
      url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`
    }),
  deleteInvoiceItemSuccess: createStandardAction(
    DeleteInvoiceItemTypes.DELETE_INVOICE_ITEM_SUCCESS
  )<IInvoiceItem>(),
  deleteInvoiceItemFailure: createStandardAction(
    DeleteInvoiceItemTypes.DELETE_INVOICE_ITEM_FAILURE
  )<Error>()
};
