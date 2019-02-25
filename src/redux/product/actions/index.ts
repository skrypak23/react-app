import { action, createStandardAction } from 'typesafe-actions';
import IProduct from '../../../shared/models/Product';
import * as PRODUCT_TYPES from './types';
import { URL_ALL_PRODUCTS } from '../../../shared/api';
import { ID } from '../../../shared/typing/records';

export const fetchAllProducts = () =>
  action(PRODUCT_TYPES.GET_PRODUCTS_REQUEST, URL_ALL_PRODUCTS);
export const fetchDataSuccess = createStandardAction(
  PRODUCT_TYPES.GET_PRODUCTS_SUCCESS
)<IProduct[]>();

export const fetchProductById = (id: ID) =>
  action(PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST, `${URL_ALL_PRODUCTS}/${id}`);
export const fetchDataByIdSuccess = createStandardAction(
  PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS
)<IProduct>();

export const createProduct = (product: IProduct) =>
  action(PRODUCT_TYPES.CREATE_PRODUCT_REQUEST, {
    url: URL_ALL_PRODUCTS,
    body: product
  });
export const createSuccess = createStandardAction(
  PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS
)<IProduct>();

export const editProduct = (id: ID, product: IProduct) =>
  action(PRODUCT_TYPES.EDIT_PRODUCT_REQUEST, {
    url: `${URL_ALL_PRODUCTS}/${id}`,
    body: product
  });
export const editSuccess = createStandardAction(
  PRODUCT_TYPES.EDIT_PRODUCT_SUCCESS
)<IProduct>();

export const deleteProduct = (id: ID) =>
  action(PRODUCT_TYPES.DELETE_PRODUCT_REQUEST, {
    url: `${URL_ALL_PRODUCTS}/${id}`
  });
export const deleteSuccess = createStandardAction(
  PRODUCT_TYPES.DELETE_PRODUCT_SUCCESS
)<IProduct>();

export const resetProduct = createStandardAction(PRODUCT_TYPES.RESET_PRODUCT)<
  undefined
>();
export const setError = createStandardAction(PRODUCT_TYPES.FETCH_PRODUCT_ERROR)<
  string
>();
