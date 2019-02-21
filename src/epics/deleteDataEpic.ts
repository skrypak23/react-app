import {Action} from 'redux';
import {Observable, of, from, concat} from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {
    CUSTOMER_TYPES,
    PRODUCT_TYPES,
    INVOICE_TYPES,
    INVOICE_ITEMS_TYPES
} from '../types';
import {
    CustomerActions,
    ProductActions,
    InvoiceActions,
    InvoiceItemActions
} from '../actions';
import API from '../api';
import ICustomer from '../models/Customer';
import IProduct from '../models/Product';
import IInvoice from '../models/Invoice';
import IInvoiceItem from '../models/InvoiceItem';

type PayloadData = { url: string; };
type Actions = { deleteSuccess: Function; setError: Function };

const deleteCustomersEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(CUSTOMER_TYPES.DELETE_CUSTOMER_REQUEST),
        switchMap((action: any) =>
            concat(
                createRequest<ICustomer>(CustomerActions, action.payload),
                of(CustomerActions.fetchAllCustomers())))
    );
const deleteProductEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(PRODUCT_TYPES.DELETE_PRODUCT_REQUEST),
        switchMap((action: any) =>
            concat(
                createRequest<IProduct>(ProductActions, action.payload),
                of(ProductActions.fetchAllProducts())))
    );
const deleteInvoiceEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(INVOICE_TYPES.DELETE_INVOICE_REQUEST),
        switchMap((action: any) =>
            concat(
                createRequest<IInvoice>(InvoiceActions, action.payload),
                of(InvoiceActions.fetchAllInvoices())))
    );

function createRequest<T>(action: Actions, data: PayloadData) {
    return from(
        API.request<T>(data.url, {
            method: 'DELETE'
        })
    ).pipe(
        map((response: T) => action.deleteSuccess(response)),
        catchError(err => of(action.setError(err.message)))
    );
}

export default [deleteCustomersEpic, deleteProductEpic, deleteInvoiceEpic]
