import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../../../../../shared/models/Product';
import { URL_ALL_PRODUCTS } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum FetchProductByIdTypes {
  FETCH_PRODUCT_BY_ID_REQUEST = '@invoice-app/product/FETCH_PRODUCT_BY_ID_REQUEST',
  FETCH_PRODUCT_BY_ID_SUCCESS = '@invoice-app/product/FETCH_PRODUCT_BY_ID_SUCCESS',
  RESET_PRODUCT = '@invoice-app/product/RESET_PRODUCT',
  FETCH_PRODUCT_BY_ID_FAILURE = '@invoice-app/product/FETCH_PRODUCT_BY_ID_FAILURE'
}

export const FetchProductByIdActions = {
  fetchProductByIdRequest: (id: ID) =>
    action(FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_REQUEST, {
      url: `${URL_ALL_PRODUCTS}/${id}`
    }),
  resetProduct: createStandardAction(FetchProductByIdTypes.RESET_PRODUCT)<undefined>(),
  fetchProductByIdSuccess: createStandardAction(
    FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_SUCCESS
  )<IProduct>(),
  fetchProductByIdFailure: createStandardAction(
    FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_FAILURE
  )<Error>()
};
