import { action } from 'typesafe-actions';
import IProduct from '../models/Product';
import { PRODUCT_TYPES } from '../types';
import { URL_ALL_PRODUCTS } from '../api';

export const fetchProducts = () =>
  action(PRODUCT_TYPES.GET_PRODUCTS_REQUEST, URL_ALL_PRODUCTS);
export const fetchProductsSuccess = (products: IProduct[]) =>
  action(PRODUCT_TYPES.GET_PRODUCTS_SUCCESS, products);

export const fetchProductById = (id: string | number) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST, id);
export const fetchProductByIdSuccess = (product: IProduct) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS, product);

export const createProduct = (product: IProduct) =>
  action(PRODUCT_TYPES.CREATE_PRODUCT_REQUEST, product);
export const createProductSuccess = () =>
  action(PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS, 'success');

export const setError = (error: string) =>
  action(PRODUCT_TYPES.FETCH_PRODUCT_ERROR, error);
