import { action, createStandardAction } from 'typesafe-actions';
import IInvoice from '../../../../../../../shared/models/Invoice';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';

export enum CreateInvoiceTypes {
  CREATE_INVOICE_REQUEST = '@invoice-app/invoice/CREATE_INVOICE_REQUEST',
  CREATE_INVOICE_SUCCESS = '@invoice-app/invoice/CREATE_INVOICE_SUCCESS',
  CREATE_INVOICE_FAILURE = '@invoice-app/invoice/CREATE_INVOICE_FAILURE'
}

export const CreateInvoiceActions = {
  createInvoiceRequest: (invoice: IInvoice) =>
    action(CreateInvoiceTypes.CREATE_INVOICE_REQUEST, {
      url: URL_ALL_INVOICES,
      body: invoice
    }),
  createInvoiceSuccess: createStandardAction(CreateInvoiceTypes.CREATE_INVOICE_SUCCESS)<
    IInvoice
  >(),
  createInvoiceFailure: createStandardAction(CreateInvoiceTypes.CREATE_INVOICE_FAILURE)<
    Error
  >()
};
