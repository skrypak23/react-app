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
import { isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../redux/store/types';

type PayloadData = { url: string };
type Actions = { deleteSuccess: Function; setError: Function };

const deleteCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.DELETE_CUSTOMER_REQUEST)),
    switchMap(action =>
      concat(
        createRequest<ICustomer>(CustomerActions, action.payload),
        of(CustomerActions.fetchAllCustomers())
      )
    )
  );
const deleteProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.DELETE_PRODUCT_REQUEST)),
    switchMap(action => createRequest<IProduct>(ProductActions, action.payload))
  );
const deleteInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.DELETE_INVOICE_REQUEST)),
    switchMap(action => createRequest<IInvoice>(InvoiceActions, action.payload))
  );
const deleteInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_REQUEST)),
    switchMap(action =>
      concat(createRequest<IInvoiceItem>(InvoiceItemActions, action.payload))
    )
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

export default [
  deleteCustomersEpic,
  deleteProductEpic,
  deleteInvoiceEpic,
  deleteInvoiceItemEpic
];
