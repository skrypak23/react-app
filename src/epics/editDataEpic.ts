import { Action } from 'redux';
import { Observable, of, from, concat } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
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
import API from '../shared/services';
import ICustomer from '../shared/models/Customer';
import IProduct from '../shared/models/Product';
import IInvoice from '../shared/models/Invoice';
import IInvoiceItem from '../shared/models/InvoiceItem';
import { RootAction, RootState } from '../redux/store/types';
import { isOfType } from 'typesafe-actions';

type PayloadData = { url: string; body: ICustomer | IProduct | IInvoice | IInvoiceItem };
type Actions = { editSuccess: Function; setError: Function };

const editCustomerEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST)),
    switchMap(action => createRequest<ICustomer>(CustomerActions, action.payload))
  );
const editProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.EDIT_PRODUCT_REQUEST)),
    switchMap(action => createRequest<IProduct>(ProductActions, action.payload))
  );
const editInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.EDIT_INVOICE_REQUEST)),
    switchMap(action => createRequest<IInvoice>(InvoiceActions, action.payload))
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
