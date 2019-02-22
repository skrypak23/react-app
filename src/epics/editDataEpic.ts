import { Action } from 'redux';
import { Observable, of, from, concat } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
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

type PayloadData = { url: string; body: ICustomer | IProduct | IInvoice | IInvoiceItem };
type Actions = { editSuccess: Function; setError: Function };

const editCustomerEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST),
    switchMap((action: any) => createRequest<ICustomer>(CustomerActions, action.payload))
  );
const editProductEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(PRODUCT_TYPES.EDIT_PRODUCT_REQUEST),
    switchMap((action: any) => createRequest<IProduct>(ProductActions, action.payload))
  );
const editInvoiceEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_TYPES.EDIT_INVOICE_REQUEST),
    switchMap((action: any) => createRequest<IInvoice>(InvoiceActions, action.payload))
  );

function createRequest<T>(action: Actions, data: PayloadData) {
  return from(
    API.request<T>(data.url, {
      method: 'PUT',
      body: JSON.stringify(data.body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  ).pipe(
    map((response: T) => action.editSuccess(response)),
    catchError(err => of(action.setError(err.message)))
  );
}

export default [editCustomerEpic, editProductEpic, editInvoiceEpic];
