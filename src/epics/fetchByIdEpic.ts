import { Action } from 'redux';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { CUSTOMER_TYPES, PRODUCT_TYPES, INVOICE_TYPES, INVOICE_ITEMS_TYPES } from '../types';
import { CustomerActions, ProductActions, InvoiceActions, InvoiceItemActions } from '../actions';
import API from '../api';
import ICustomer from '../models/Customer';
import IProduct from '../models/Product';
import IInvoice from '../models/Invoice';
import IInvoiceItem from '../models/InvoiceItem';

type Actions = { fetchDataByIdSuccess: Function; setError: Function };

const fetchCustomersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST),
    switchMap((action: any) => createRequest<ICustomer>(CustomerActions, action.payload))
  );
const fetchProductsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST),
    switchMap((action: any) => createRequest<IProduct>(ProductActions, action.payload))
  );
const fetchInvoicesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST),
    switchMap((action: any) => createRequest<IInvoice>(InvoiceActions, action.payload))
  );
const fetchInvoiceItemsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST),
    switchMap((action: any) => createRequest<IInvoiceItem>(InvoiceItemActions, action.payload))
  );

function createRequest<T>(action: Actions, url: string) {
  return from(API.request<T>(url)).pipe(
    map((data: T) => action.fetchDataByIdSuccess(data)),
    catchError(err => of(action.setError(err.message)))
  );
}

export default [fetchCustomersEpic, fetchProductsEpic, fetchInvoiceItemsEpic, fetchInvoicesEpic];
