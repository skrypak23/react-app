import { action, createStandardAction } from 'typesafe-actions';
import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum CreateInvoiceItemTypes {
  CREATE_INVOICE_ITEM_REQUEST = '@invoice-app/invoice-item/CREATE_INVOICE_ITEM_REQUEST',
  CREATE_INVOICE_ITEM_SUCCESS = '@invoice-app/invoice-item/CREATE_INVOICE_ITEM_SUCCESS',
  CREATE_INVOICE_ITEM_FAILURE = '@invoice-app/invoice-item/CREATE_INVOICE_ITEM_FAILURE'
}

export const CreateInvoiceItemActions = {
  createInvoiceItemRequest: (id: ID, invoice: IInvoiceItem) =>
    action(CreateInvoiceItemTypes.CREATE_INVOICE_ITEM_REQUEST, {
      url: `${URL_ALL_INVOICES}/${id}/items`,
      body: invoice
    }),
  createInvoiceItemSuccess: createStandardAction(
    CreateInvoiceItemTypes.CREATE_INVOICE_ITEM_SUCCESS
  )<IInvoiceItem>(),
  createInvoiceItemFailure: createStandardAction(
    CreateInvoiceItemTypes.CREATE_INVOICE_ITEM_FAILURE
  )<Error>()
};
