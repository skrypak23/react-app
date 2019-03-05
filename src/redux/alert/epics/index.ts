import { filter, mapTo } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../store/types';
import * as AlertActions from '../actions';
import {
  CustomerRequest,
  InvoiceRequest,
  InvoiceItemRequest,
  ProductRequest
} from '../../request/actions';
const { Types: CTypes } = CustomerRequest;
const { Types: ITypes } = InvoiceRequest;
const { Types: PTypes } = ProductRequest;
const { Types: IITypes } = InvoiceItemRequest;

const createAlertEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        CTypes.CREATE_CUSTOMER_SUCCESS,
        CTypes.CREATE_CUSTOMER_SUCCESS,
        PTypes.CREATE_PRODUCT_SUCCESS,
        IITypes.CREATE_INVOICE_ITEM_SUCCESS
      ])
    ),
    mapTo(AlertActions.setSuccessAlert(true, 'Record was successfully created!'))
  );
const updateAlertEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        CTypes.UPDATE_CUSTOMER_SUCCESS,
        CTypes.UPDATE_CUSTOMER_SUCCESS,
        PTypes.UPDATE_PRODUCT_SUCCESS,
        IITypes.UPDATE_INVOICE_ITEM_SUCCESS
      ])
    ),
    mapTo(AlertActions.setSuccessAlert(true, 'Record was successfully updated!'))
  );

const deleteAlertEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        CTypes.DELETE_CUSTOMER_SUCCESS,
        ITypes.DELETE_INVOICE_SUCCESS,
        PTypes.DELETE_PRODUCT_SUCCESS,
        IITypes.DELETE_INVOICE_ITEM_SUCCESS
      ])
    ),
    mapTo(AlertActions.setSuccessAlert(true, 'Record was successfully deleted!'))
  );

const errorAlertEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        CTypes.DELETE_CUSTOMER_FAILURE,
        ITypes.DELETE_INVOICE_FAILURE,
        PTypes.DELETE_PRODUCT_FAILURE,
        IITypes.DELETE_INVOICE_ITEM_FAILURE,

        CTypes.UPDATE_CUSTOMER_FAILURE,
        ITypes.UPDATE_INVOICE_FAILURE,
        PTypes.UPDATE_PRODUCT_FAILURE,
        IITypes.UPDATE_INVOICE_ITEM_FAILURE,

        CTypes.CREATE_CUSTOMER_FAILURE,
        ITypes.CREATE_INVOICE_FAILURE,
        PTypes.CREATE_PRODUCT_FAILURE,
        IITypes.CREATE_INVOICE_ITEM_FAILURE,

        CTypes.FETCH_CUSTOMERS_FAILURE,
        ITypes.FETCH_INVOICES_FAILURE,
        PTypes.FETCH_PRODUCTS_FAILURE,
        IITypes.FETCH_INVOICE_ITEMS_FAILURE,

        CTypes.FETCH_CUSTOMERS_BY_ID_FAILURE,
        ITypes.FETCH_INVOICE_BY_ID_FAILURE,
        PTypes.FETCH_PRODUCT_BY_ID_FAILURE,
        IITypes.FETCH_INVOICE_ITEM_BY_ID_FAILURE
      ])
    ),
    mapTo(AlertActions.setFailureAlert(true, 'Oops, something wrong!'))
  );

export default [createAlertEpic, deleteAlertEpic, updateAlertEpic, errorAlertEpic];
