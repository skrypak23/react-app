import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../../../../../shared/models/Product';
import { URL_ALL_PRODUCTS } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum FetchProductByIdTypes {
  FETCH_PRODUCT_BY_ID_REQUEST = '@invoice-app/customer/FETCH_PRODUCT_BY_ID_REQUEST',
  FETCH_PRODUCT_BY_ID_SUCCESS = '@invoice-app/customer/FETCH_PRODUCT_BY_ID_SUCCESS',
  FETCH_PRODUCT_BY_ID_FAILURE = '@invoice-app/customer/FETCH_PRODUCT_BY_ID_FAILURE'
}

export const FetchProductByIdActions = {
  fetchProductById: (id: ID) =>
    action(FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_REQUEST, {
      url: `${URL_ALL_PRODUCTS}/${id}`
    }),
  fetchProductByIdSuccess: createStandardAction(
    FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_SUCCESS
  )<IProduct>(),
  fetchProductByIdFailure: createStandardAction(
    FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_FAILURE
  )<Error>()
};
