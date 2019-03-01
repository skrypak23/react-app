import { createStandardAction } from 'typesafe-actions';
import IProduct from '../../../shared/models/Product';
import * as PRODUCT_TYPES from './types';

export const setProductData = createStandardAction(PRODUCT_TYPES.SET_PRODUCT_DATA)<
    IProduct[]
    >();

export const deleteProductData = createStandardAction(PRODUCT_TYPES.DELETE_PRODUCT)<
    IProduct
    >();

