import { filter, map, mapTo } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../store/types';
import * as ProductActions from '../actions';
import { ProductRequest as Request } from '../../request/actions';
import * as PRODUCT_TYPES from '../actions/types';

const { Action, Types } = Request;

const setProductDataEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        Types.CREATE_PRODUCT_SUCCESS,
        Types.UPDATE_PRODUCT_SUCCESS,
        Types.DELETE_PRODUCT_SUCCESS,
        Types.FETCH_PRODUCTS_SUCCESS
      ])
    ),
    map(action => {
      if (action.type === Types.DELETE_PRODUCT_SUCCESS) {
        return ProductActions.deleteProductData(action.payload);
      } else {
        if (Array.isArray(action.payload)) {
          return ProductActions.setProductData(action.payload);
        }
        return ProductActions.setProductData([action.payload]);
      }
    })
  );

const createProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.CREATE_PRODUCT)),
    map(action => Action.createProductRequest(action.payload))
  );

const editProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.EDIT_PRODUCT)),
    map(action => Action.editProductRequest(action.payload.id, action.payload.product))
  );

const deleteProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.DELETE_PRODUCT)),
    map(action => Action.deleteProductRequest(action.payload))
  );

const fetchProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.FETCH_PRODUCTS)),
    mapTo(Action.fetchAllProductsRequest())
  );

const fetchProductByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.FETCH_PRODUCT)),
    map(action => Action.fetchProductByIdRequest(action.payload))
  );

const resetProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(PRODUCT_TYPES.RESET_PRODUCT)),
    mapTo(Action.resetProduct())
  );

export default [
  setProductDataEpic,
  createProductEpic,
  deleteProductEpic,
  editProductEpic,
  fetchProductEpic,
  fetchProductByIdEpic,
  resetProductEpic
];
