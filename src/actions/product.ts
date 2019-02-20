import { action } from 'typesafe-actions';
import IProduct from '../models/Product';
import { PRODUCT_TYPES } from '../types';
import { URL_ALL_PRODUCTS } from '../api';

export const fetchAllProducts = () =>
  action(PRODUCT_TYPES.GET_PRODUCTS_REQUEST, URL_ALL_PRODUCTS);
export const fetchDataSuccess = (products: IProduct[]) =>
  action(PRODUCT_TYPES.GET_PRODUCTS_SUCCESS, products);

export const fetchProductById = (id: string | number) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST, id);
export const fetchDataByIdSuccess = (product: IProduct) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS, product);

export const createProduct = (body: IProduct) =>
  action(PRODUCT_TYPES.CREATE_PRODUCT_REQUEST, body);
export const createSuccess = (product: IProduct) =>
  action(PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS, product);

export const setError = (error: string) =>
  action(PRODUCT_TYPES.FETCH_PRODUCT_ERROR, error);
