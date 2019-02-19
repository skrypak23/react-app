import { action, createStandardAction } from 'typesafe-actions';
import { CUSTOMER_TYPES } from '../types';
import ICustomer from '../models/Customer';

export const fetchCustomers = createStandardAction(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST)<string>();
export const fetchCustomersSuccess = (customers: ICustomer[]) =>
  action(CUSTOMER_TYPES.GET_CUSTOMERS_SUCCESS, customers);

export const fetchCustomerById = (id: string | number) =>
  action(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST, id);
export const fetchCustomerByIdSuccess = (customer: ICustomer) =>
  action(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_SUCCESS, customer);

export const setError = (error: string) => ({
  type: CUSTOMER_TYPES.FETCH_CUSTOMER_ERROR,
  payload: error
});
