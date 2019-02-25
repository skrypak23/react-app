import {action} from 'typesafe-actions';
import IInvoiceItem from '../shared/models/InvoiceItem';
import {ID} from '../common/types';
import {INVOICE_ITEMS_TYPES} from '../types';
import {URL_ALL_INVOICES} from '../shared/services';

export const fetchAllInvoiceItems = (invoiceId: ID) =>
    action(
        INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST,
        `${URL_ALL_INVOICES}/${invoiceId}/items`
    );
export const fetchDataSuccess = (invoices: IInvoiceItem[]) =>
    action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_SUCCESS, invoices);

export const fillItems = (invoiceItem: IInvoiceItem) =>
    action(INVOICE_ITEMS_TYPES.FILL_INVOICE_ITEMS, invoiceItem);

export const fetchInvoiceItemById = (id: ID, invoiceId: ID) =>
    action(
        INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST,
        `${URL_ALL_INVOICES}/${invoiceId}/items${id}`
    );
export const fetchDataByIdSuccess = (customer: IInvoiceItem) =>
    action(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_SUCCESS, customer);

export const createInvoiceItem = (id: ID, invoice: IInvoiceItem) =>
    action(INVOICE_ITEMS_TYPES.CREATE_INVOICE_ITEMS_REQUEST, {
        url: `${URL_ALL_INVOICES}/${id}/items`,
        body: invoice
    });
export const createSuccess = (invoice: IInvoiceItem) =>
    action(INVOICE_ITEMS_TYPES.CREATE_INVOICE_ITEMS_SUCCESS, invoice);

export const editInvoiceItem = (id: ID, invoiceId: ID, invoice: IInvoiceItem[]) => () =>
    action(INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_REQUEST, {
        url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`,
        body: invoice
    });
export const editSuccess = (invoice: IInvoiceItem) =>
    action(INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_SUCCESS, invoice);

export const deleteInvoiceItem = (id: ID, invoiceId: ID) =>
    action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_REQUEST, {
        url: `${URL_ALL_INVOICES}/${invoiceId}/items/${id}`
    });
export const deleteInvoiceItemLocal = (id: ID) =>
    action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL, id);
export const deleteSuccess = (invoice: IInvoiceItem) =>
    action(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_SUCCESS, invoice);

export const resetInvoiceItem = () =>
    action(INVOICE_ITEMS_TYPES.RESET_INVOICE_ITEMS, 'reset');

export const setError = (error: string) =>
    action(INVOICE_ITEMS_TYPES.FETCH_INVOICE_ITEMS_ERROR, error);
