import { action } from 'typesafe-actions';
import IProduct from '../models/Product';
import { PRODUCT_TYPES } from '../types';
import { URL_ALL_PRODUCTS } from '../api';
import { ID } from '../common/types';

export const fetchAllProducts = () => action(PRODUCT_TYPES.GET_PRODUCTS_REQUEST, URL_ALL_PRODUCTS);
export const fetchDataSuccess = (products: IProduct[]) =>
  action(PRODUCT_TYPES.GET_PRODUCTS_SUCCESS, products);

export const fetchProductById = (id: ID) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST, `${URL_ALL_PRODUCTS}/${id}`);
export const fetchDataByIdSuccess = (customer: IProduct) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS, customer);

export const createProduct = (product: IProduct) =>
  action(PRODUCT_TYPES.CREATE_PRODUCT_REQUEST, { url: URL_ALL_PRODUCTS, body: product });
export const createSuccess = (product: IProduct) =>
  action(PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS, product);

export const editProduct = (id: ID, product: IProduct) =>
  action(PRODUCT_TYPES.EDIT_PRODUCT_REQUEST, { url: `${URL_ALL_PRODUCTS}/${id}`, body: product });
export const editSuccess = (product: IProduct) =>
  action(PRODUCT_TYPES.EDIT_PRODUCT_SUCCESS, product);

export const deleteProduct = (id: ID) =>
  action(PRODUCT_TYPES.DELETE_PRODUCT_REQUEST, { url: `${URL_ALL_PRODUCTS}/${id}` });
export const deleteSuccess = (product: IProduct) =>
  action(PRODUCT_TYPES.DELETE_PRODUCT_SUCCESS, product);

export const resetProduct = () => action(PRODUCT_TYPES.RESET_PRODUCT, 'reset');

export const setError = (error: string) => action(PRODUCT_TYPES.FETCH_PRODUCT_ERROR, error);
