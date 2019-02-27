import { of, Observable, concat } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { RootAction, RootState } from '../../store/types';
import * as PRODUCT_TYPES from '../actions/types';
import IProduct from '../../../shared/models/Product';
import * as ProductActions from '../actions';
import { isOfType } from 'typesafe-actions';
import { Action } from 'redux';
import ApiService from '../../../shared/services/request.service';

const fetchProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.GET_PRODUCTS_REQUEST)),
    switchMap(action => ApiService.fetchAllData<IProduct>(ProductActions, action.payload))
  );

const fetchProductsByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST)),
    switchMap(action => ApiService.fetchById<IProduct>(ProductActions, action.payload))
  );

const editProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.EDIT_PRODUCT_REQUEST)),
    switchMap(action => ApiService.editData<IProduct>(ProductActions, action.payload))
  );

const deleteProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.DELETE_PRODUCT_REQUEST)),
    switchMap(action =>
      concat(
        ApiService.deleteData<IProduct>(ProductActions, action.payload),
        of(ProductActions.fetchAllProducts())
      )
    )
  );

const createProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.CREATE_PRODUCT_REQUEST)),
    switchMap(action => ApiService.createData<IProduct>(ProductActions, action.payload))
  );

export default [
  fetchProductsByIdEpic,
  fetchProductsEpic,
  editProductEpic,
  deleteProductsEpic,
  createProductsEpic
];
