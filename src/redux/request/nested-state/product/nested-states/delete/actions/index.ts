import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../../../../../shared/models/Product';
import { URL_ALL_PRODUCTS } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum DeleteProductTypes {
  DELETE_PRODUCT_REQUEST = '@invoice-app/product/DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCESS = '@invoice-app/product/DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE = '@invoice-app/product/DELETE_PRODUCT_FAILURE'
}

export const DeleteProductActions = {
  deleteProductRequest: (id: ID) =>
    action(DeleteProductTypes.DELETE_PRODUCT_REQUEST, {
      url: `${URL_ALL_PRODUCTS}/${id}`
    }),
  deleteProductSuccess: createStandardAction(DeleteProductTypes.DELETE_PRODUCT_SUCCESS)<
    IProduct
  >(),
  deleteProductFailure: createStandardAction(DeleteProductTypes.DELETE_PRODUCT_FAILURE)<
    Error
  >()
};
