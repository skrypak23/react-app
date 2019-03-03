import { createStandardAction } from 'typesafe-actions';
import ICustomer from '../../../shared/models/Customer';
import * as CUSTOMER_TYPES from './types';

export const setCustomerData = createStandardAction(CUSTOMER_TYPES.SET_CUSTOMER_DATA)<
  ICustomer[]
>();

export const  deleteActionData = createStandardAction(CUSTOMER_TYPES.DELETE_CUSTOMER)<
  ICustomer
>();
