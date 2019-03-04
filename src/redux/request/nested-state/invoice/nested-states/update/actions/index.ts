import { action, createStandardAction } from 'typesafe-actions';
import IInvoice from '../../../../../../../shared/models/Invoice';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum UpdateInvoiceTypes {
  UPDATE_INVOICE_REQUEST = '@invoice-app/invoice/UPDATE_INVOICE_REQUEST',
  UPDATE_INVOICE_SUCCESS = '@invoice-app/invoice/UPDATE_INVOICE_SUCCESS',
  UPDATE_INVOICE_FAILURE = '@invoice-app/invoice/UPDATE_INVOICE_FAILURE'
}

export const UpdateInvoiceActions = {
  editInvoiceRequest: (id: ID, invoice: IInvoice) =>
    action(UpdateInvoiceTypes.UPDATE_INVOICE_REQUEST, {
      url: `${URL_ALL_INVOICES}/${id}`,
      body: invoice
    }),
  editInvoiceSuccess: createStandardAction(UpdateInvoiceTypes.UPDATE_INVOICE_SUCCESS)<
    IInvoice
  >(),
  editInvoiceFailure: createStandardAction(UpdateInvoiceTypes.UPDATE_INVOICE_FAILURE)<
    Error
  >()
};
