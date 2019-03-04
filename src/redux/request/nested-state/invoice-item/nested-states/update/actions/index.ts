import { action, createStandardAction } from 'typesafe-actions';
import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum UpdateInvoiceItemTypes {
  UPDATE_INVOICE_ITEM_REQUEST = '@invoice-app/invoice-item/UPDATE_INVOICE_ITEM_REQUEST',
  UPDATE_INVOICE_ITEM_SUCCESS = '@invoice-app/invoice-item/UPDATE_INVOICE_ITEM_SUCCESS',
  UPDATE_INVOICE_ITEM_FAILURE = '@invoice-app/invoice-item/UPDATE_INVOICE_ITEM_FAILURE'
}

export const UpdateInvoiceItemActions = {
  editInvoiceItemRequest: (id: ID, invoiceId: ID, invoice: IInvoiceItem) =>
    action(UpdateInvoiceItemTypes.UPDATE_INVOICE_ITEM_REQUEST, {
      url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`,
      body: invoice
    }),
  editInvoiceItemSuccess: createStandardAction(
    UpdateInvoiceItemTypes.UPDATE_INVOICE_ITEM_SUCCESS
  )<IInvoiceItem>(),
  editInvoiceItemFailure: createStandardAction(
    UpdateInvoiceItemTypes.UPDATE_INVOICE_ITEM_FAILURE
  )<Error>()
};
