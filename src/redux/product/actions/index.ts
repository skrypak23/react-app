import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../shared/models/Product';
import * as PRODUCT_TYPES from './types';

export const setProductData = createStandardAction(PRODUCT_TYPES.SET_PRODUCT_DATA)<
  IProduct[]
>();

export const deleteProductData = createStandardAction(PRODUCT_TYPES.DELETE_PRODUCT_DATA)<
  IProduct
>();

export const createProduct = createStandardAction(PRODUCT_TYPES.CREATE_PRODUCT)<
  IProduct
>();
export const editProduct = (id: number, product: IProduct) =>
  action(PRODUCT_TYPES.EDIT_PRODUCT, { id, product });
export const deleteProduct = createStandardAction(PRODUCT_TYPES.DELETE_PRODUCT)<number>();
export const fetchProducts = createStandardAction(PRODUCT_TYPES.FETCH_PRODUCTS)<
  undefined
>();
export const fetchProduct = createStandardAction(PRODUCT_TYPES.FETCH_PRODUCT)<number>();
export const resetProductLocal = createStandardAction(PRODUCT_TYPES.RESET_PRODUCT)<
  undefined
>();
