import { Action } from 'redux';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  CUSTOMER_TYPES,
  PRODUCT_TYPES,
  INVOICE_TYPES,
  INVOICE_ITEMS_TYPES
} from '../types';
import API from '../api';
import {
  CustomerActions,
  ProductActions,
  InvoiceActions,
  InvoiceItemActions
} from '../actions';
import ICustomer from '../models/Customer';
import IProduct from '../models/Product';
import IInvoice from '../models/Invoice';
import IInvoiceItem from '../models/InvoiceItem';

const createCustomersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST),
    switchMap((data: any) => createRequest<ICustomer>(CustomerActions, data))
  );
const fetchProductsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(PRODUCT_TYPES.CREATE_PRODUCT_REQUEST),
    switchMap((data: any) => createRequest<IProduct>(ProductActions, data))
  );
const fetchInvoicesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_TYPES.CREATE_INVOICE_REQUEST),
    switchMap((data: any) => createRequest<IInvoice>(InvoiceActions, data))
  );
const fetchInvoiceItemsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_ITEMS_TYPES.CREATE_INVOICE_REQUEST),
    switchMap((data: any) => createRequest<IProduct>(ProductActions, data))
  );

function createRequest<T>(action: any, data: any) {
  return from(
    API.request<T>(data.payload.url, {
      method: 'POST',
      body: JSON.stringify(data.payload.body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  ).pipe(
    map((data: T) => action.createSuccess(data)),
    catchError(err => of(action.setError(err.message)))
  );
}

export default [
  createCustomersEpic,
  fetchProductsEpic,
  fetchInvoiceItemsEpic,
  fetchInvoicesEpic
];
