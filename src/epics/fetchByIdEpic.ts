import { Action } from 'redux';
import { Observable, of, from } from 'rxjs';
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
import API from '../api';
import ICustomer from '../models/Customer';
import IProduct from '../models/Product';
import IInvoice from '../models/Invoice';
import IInvoiceItem from '../models/InvoiceItem';
import { RootAction, RootState } from '../store/types';
import { isOfType } from 'typesafe-actions';

type Actions = { fetchDataByIdSuccess: Function; setError: Function };

const fetchCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST)),
    switchMap(action => createRequest<ICustomer>(CustomerActions, action.payload))
  );
const fetchProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST)),
    switchMap(action => createRequest<IProduct>(ProductActions, action.payload))
  );
const fetchInvoicesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST)),
    switchMap(action => createRequest<IInvoice>(InvoiceActions, action.payload))
  );
const fetchInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST)),
    switchMap(action => createRequest<IInvoiceItem>(InvoiceItemActions, action.payload))
  );

function createRequest<T>(action: Actions, url: string) {
  return from(API.request<T>(url)).pipe(
    map((data: T) => action.fetchDataByIdSuccess(data)),
    catchError(err => of(action.setError(err.message)))
  );
}

export default [
  fetchCustomersEpic,
  fetchProductsEpic,
  fetchInvoiceItemsEpic,
  fetchInvoicesEpic
];
