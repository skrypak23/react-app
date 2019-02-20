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

const fetchCustomersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST),
    switchMap((data: any) =>
      from(API.fetchAll<ICustomer>(data.payload)).pipe(
        map((data: ICustomer[]) => CustomerActions.fetchCustomersSuccess(data)),
        catchError(err => of(CustomerActions.setError(err.message)))
      )
    )
  );
const fetchProductsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(PRODUCT_TYPES.GET_PRODUCTS_REQUEST),
    switchMap((data: any) =>
      from(API.fetchAll<IProduct>(data.payload)).pipe(
        map((data: IProduct[]) => ProductActions.fetchProductsSuccess(data)),
        catchError(err => of(ProductActions.setError(err.message)))
      )
    )
  );
const fetchInvoicesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_TYPES.GET_INVOICES_REQUEST),
    switchMap((data: any) =>
      from(API.fetchAll<IInvoice>(data.payload)).pipe(
        map((data: IInvoice[]) => InvoiceActions.fetchInvoicesSuccess(data)),
        catchError(err => of(InvoiceActions.setError(err.message)))
      )
    )
  );
const fetchInvoiceItemsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST),
    switchMap((data: any) =>
      from(API.fetchAll<IInvoiceItem>(data.payload)).pipe(
        map((data: IInvoiceItem[]) => InvoiceItemActions.fetchInvoicesSuccess(data)),
        catchError(err => of(InvoiceItemActions.setError(err.message)))
      )
    )
  );

export default [
  fetchCustomersEpic,
  fetchProductsEpic,
  fetchInvoiceItemsEpic,
  fetchInvoicesEpic
];
