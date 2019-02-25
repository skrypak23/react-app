import { action, createStandardAction } from "typesafe-actions";
import IInvoice from "../../../shared/models/Invoice";
import * as INVOICE_TYPES  from "./types";
import { URL_ALL_INVOICES } from "../../../shared/services";
import { ID } from "../../../shared/typing/records";

export const fetchAllInvoices = () =>
    action(INVOICE_TYPES.GET_INVOICES_REQUEST, URL_ALL_INVOICES);
export const fetchDataSuccess = createStandardAction(INVOICE_TYPES.GET_INVOICES_SUCCESS)<IInvoice[]>();

export const fetchInvoiceById = (id: ID) =>
    action(INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST, `${URL_ALL_INVOICES}/${id}`);
export const fetchDataByIdSuccess = createStandardAction(INVOICE_TYPES.GET_INVOICE_BY_ID_SUCCESS)<IInvoice>();

export const createInvoice = (invoice: IInvoice) =>
    action(INVOICE_TYPES.CREATE_INVOICE_REQUEST, {
        url: URL_ALL_INVOICES,
        body: invoice
    });
export const createSuccess = createStandardAction(INVOICE_TYPES.CREATE_INVOICE_SUCCESS)<IInvoice>();

export const editInvoice = (id: ID, invoice: IInvoice) =>
    action(INVOICE_TYPES.EDIT_INVOICE_REQUEST, {
        url: `${URL_ALL_INVOICES}/${id}`,
        body: invoice
    });
export const editSuccess = createStandardAction(INVOICE_TYPES.EDIT_INVOICE_SUCCESS)<IInvoice>();

export const deleteInvoice = (id: ID) =>
    action(INVOICE_TYPES.DELETE_INVOICE_REQUEST, {
        url: `${URL_ALL_INVOICES}/${id}`
    });
export const deleteSuccess = createStandardAction(INVOICE_TYPES.DELETE_INVOICE_SUCCESS)<IInvoice>;

export const resetInvoice = createStandardAction(INVOICE_TYPES.RESET_INVOICE)<undefined>();
export const fillInvoice = createStandardAction(INVOICE_TYPES.FILL_INVOICE)<IInvoice>();
export const setError = createStandardAction(INVOICE_TYPES.FETCH_INVOICE_ERROR)<string>();
