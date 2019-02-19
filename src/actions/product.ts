import TYPES from '../types';
import IProduct from '../models/Product';

export const fetchProducts = () => ({ type: TYPES.CUSTOMER.GET_CUSTOMERS_REQUEST });
export const fetchProductsSuccess = (products: IProduct[]) => ({
  type: TYPES.PRODUCT.GET_PRODUCTS_REQUEST,
  payload: products
});

export const fetchProductById = (id: string | number) => ({
  type: TYPES.PRODUCT.GET_PRODUCTS_REQUEST,
  payload: id
});
export const fetchProductByIdSuccess = (product: IProduct) => ({
  type: TYPES.PRODUCT.GET_PRODUCT_BY_ID_SUCCESS,
  payload: product
});
