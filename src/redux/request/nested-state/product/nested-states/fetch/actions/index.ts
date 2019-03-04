import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../../../../../shared/models/Product';
import { URL_ALL_PRODUCTS } from '../../../../../../../shared/utils/api';

export enum FetchProductsTypes {
  FETCH_PRODUCTS_REQUEST = '@invoice-app/product/FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = '@invoice-app/product/FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = '@invoice-app/product/FETCH_PRODUCTS_FAILURE'
}

export const FetchProductActions = {
  fetchAllProductsRequest: () =>
    action(FetchProductsTypes.FETCH_PRODUCTS_REQUEST, { url: URL_ALL_PRODUCTS }),
  fetchProductsSuccess: createStandardAction(FetchProductsTypes.FETCH_PRODUCTS_SUCCESS)<
    IProduct[]
  >(),
  fetchProductsFailure: createStandardAction(FetchProductsTypes.FETCH_PRODUCTS_FAILURE)<
    Error
  >()
};
