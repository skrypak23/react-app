import { of, from } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
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

type Actions = { fetchDataSuccess: Function; setError: Function };

const fetchCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST)),
    switchMap(action => createRequest<ICustomer>(CustomerActions, action.payload))
  );
const fetchProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.GET_PRODUCTS_REQUEST)),
    switchMap(action => createRequest<IProduct>(ProductActions, action.payload))
  );
const fetchInvoicesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.GET_INVOICES_REQUEST)),
    switchMap(action => createRequest<IInvoice>(InvoiceActions, action.payload))
  );
const fetchInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST)),
    switchMap(action => createRequest<IInvoiceItem>(InvoiceItemActions, action.payload))
  );

function createRequest<T>(action: Actions, url: string) {
  return from(API.fetchAll<T>(url)).pipe(
    map((data: T[]) => action.fetchDataSuccess(data)),
    catchError(err => of(action.setError(err.message)))
  );
}

export default [
  fetchCustomersEpic,

];
