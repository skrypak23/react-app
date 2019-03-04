import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../../../../../shared/models/Product';
import { URL_ALL_PRODUCTS } from '../../../../../../../shared/utils/api';

export enum CreateProductTypes {
  CREATE_PRODUCT_REQUEST = '@invoice-app/product/CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_SUCCESS = '@invoice-app/product/CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAILURE = '@invoice-app/product/CREATE_PRODUCT_FAILURE'
}

export const CreateProductActions = {
  createProductRequest: (product: IProduct) =>
    action(CreateProductTypes.CREATE_PRODUCT_REQUEST, {
      url: URL_ALL_PRODUCTS,
      body: product
    }),
  createProductSuccess: createStandardAction(CreateProductTypes.CREATE_PRODUCT_SUCCESS)<
    IProduct
  >(),
  createProductFailure: createStandardAction(CreateProductTypes.CREATE_PRODUCT_FAILURE)<
    Error
  >()
};
