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
    mapTo(AlertActions.setSuccessAlert(true, 'Created Success!'))
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
    mapTo(AlertActions.setSuccessAlert(true, 'Updated Success!'))
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
    mapTo(AlertActions.setSuccessAlert(true, 'Updated Success!'))
  );

export default [createAlertEpic, deleteAlertEpic, updateAlertEpic];
