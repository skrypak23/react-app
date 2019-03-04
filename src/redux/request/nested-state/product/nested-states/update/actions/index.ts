import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../../../../../shared/models/Product';
import { URL_ALL_PRODUCTS } from '../../../../../../../shared/utils/api';
import {ID} from "../../../../../../../shared/typing/records";

export enum UpdateProductTypes {
  UPDATE_PRODUCT_REQUEST = '@invoice-app/product/UPDATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_SUCCESS = '@invoice-app/product/UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAILURE = '@invoice-app/product/UPDATE_PRODUCT_FAILURE'
}

export const UpdateProductActions = {
  editProductRequest: (id: ID, customer: IProduct) =>
    action(UpdateProductTypes.UPDATE_PRODUCT_REQUEST, {
      url: `${URL_ALL_PRODUCTS}/${id}`,
      body: customer
    }),
  editProductSuccess: createStandardAction(UpdateProductTypes.UPDATE_PRODUCT_SUCCESS)<
    IProduct
  >(),
  editProductFailure: createStandardAction(UpdateProductTypes.UPDATE_PRODUCT_FAILURE)<
    Error
  >()
};
