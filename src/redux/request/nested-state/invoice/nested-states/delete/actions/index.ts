import { action, createStandardAction } from 'typesafe-actions';
import IInvoice from '../../../../../../../shared/models/Invoice';
import { URL_ALL_INVOICES } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum DeleteInvoiceTypes {
  DELETE_INVOICE_REQUEST = '@invoice-app/invoice/DELETE_INVOICE_REQUEST',
  DELETE_INVOICE_SUCCESS = '@invoice-app/invoice/DELETE_INVOICE_SUCCESS',
  DELETE_INVOICE_FAILURE = '@invoice-app/invoice/DELETE_INVOICE_FAILURE'
}

export const DeleteInvoiceActions = {
  deleteInvoiceRequest: (id: ID) =>
    action(DeleteInvoiceTypes.DELETE_INVOICE_REQUEST, {
      url: `${URL_ALL_INVOICES}/${id}`, id
    }),
  deleteInvoiceSuccess: createStandardAction(DeleteInvoiceTypes.DELETE_INVOICE_SUCCESS)<
    IInvoice
  >(),
  deleteInvoiceFailure: createStandardAction(DeleteInvoiceTypes.DELETE_INVOICE_FAILURE)<
    Error
  >()
};
