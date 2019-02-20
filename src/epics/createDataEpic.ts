import { Action } from 'redux';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { CUSTOMER_TYPES, PRODUCT_TYPES, INVOICE_TYPES, INVOICE_ITEMS_TYPES } from '../types';
import API from '../api';
import { CustomerActions, ProductActions, InvoiceActions, InvoiceItemActions } from '../actions';
import ICustomer from '../models/Customer';
import IProduct from '../models/Product';
import IInvoice from '../models/Invoice';
import IInvoiceItem from '../models/InvoiceItem';

type PayloadData = { url: string; body: ICustomer | IProduct | IInvoice | IInvoiceItem };
type Actions = { createSuccess: Function; setError: Function };

const createCustomersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST),
    switchMap((action: any) => createRequest<ICustomer>(CustomerActions, action.payload))
  );
const fetchProductsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(PRODUCT_TYPES.CREATE_PRODUCT_REQUEST),
    switchMap((action: any) => createRequest<IProduct>(ProductActions, action.payload))
  );
const fetchInvoicesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_TYPES.CREATE_INVOICE_REQUEST),
    switchMap((action: any) => createRequest<IInvoice>(InvoiceActions, action.payload))
  );
const fetchInvoiceItemsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_ITEMS_TYPES.CREATE_INVOICE_REQUEST),
    switchMap((action: any) => createRequest<IInvoiceItem>(InvoiceItemActions, action.payload))
  );

function createRequest<T>(action: Actions, data: PayloadData) {
  return from(
    API.request<T>(data.url, {
      method: 'POST',
      body: JSON.stringify(data.body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  ).pipe(
    map((response: T) => action.createSuccess(response)),
    catchError(err => of(action.setError(err.message)))
  );
}

export default [createCustomersEpic, fetchProductsEpic, fetchInvoiceItemsEpic, fetchInvoicesEpic];
