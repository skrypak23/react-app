import { action, createStandardAction } from 'typesafe-actions';
import { action, createStandardAction } from 'typesafe-actions';
import { PRODUCT_TYPES } from '../types';
import IProduct from '../models/Product';

export const fetchProducts = () =>
  createStandardAction(PRODUCT_TYPES.GET_PRODUCTS_REQUEST)<string>();
export const fetchProductsSuccess = (products: IProduct[]) => (
  PRODUCT_TYPES.GET_PRODUCTS_REQUEST, products
);

export const fetchProductById = (id: string | number) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST, id);
export const fetchProductByIdSuccess = (product: IProduct) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS, product);
