import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../../../../../shared/models/Product';
import { URL_ALL_PRODUCTS } from '../../../../../../../shared/utils/api';

export enum DeleteProductTypes {
  DELETE_PRODUCT_REQUEST = '@invoice-app/product/DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCESS = '@invoice-app/product/DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE = '@invoice-app/product/DELETE_PRODUCT_FAILURE'
}

export const DeleteProductActions = {
  deleteProduct: (product: IProduct) =>
    action(DeleteProductTypes.DELETE_PRODUCT_REQUEST, {
      url: URL_ALL_PRODUCTS,
      body: product
    }),
  deleteProductSuccess: createStandardAction(
    DeleteProductTypes.DELETE_PRODUCT_SUCCESS
  )<IProduct>(),
  deleteProductFailure: createStandardAction(
    DeleteProductTypes.DELETE_PRODUCT_FAILURE
  )<Error>()
};
