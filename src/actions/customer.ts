import { action } from 'typesafe-actions';
import ICustomer from '../models/Customer';
import { CUSTOMER_TYPES } from '../types';
import { URL_ALL_CUSTOMERS } from '../api';

export const fetchCustomers = () =>
  action(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST, URL_ALL_CUSTOMERS);
export const fetchCustomersSuccess = (customers: ICustomer[]) =>
  action(CUSTOMER_TYPES.GET_CUSTOMERS_SUCCESS, customers);

export const fetchCustomerById = (id: string | number) =>
  action(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST, id);
export const fetchCustomerByIdSuccess = (customer: ICustomer) =>
  action(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_SUCCESS, customer);

export const createCustomer = (customer: ICustomer) =>
  action(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST, customer);
export const createCustomerSuccess = () =>
  action(CUSTOMER_TYPES.CREATE_CUSTOMER_SUCCESS, 'success');

export const setError = (error: string) =>
  action(CUSTOMER_TYPES.FETCH_CUSTOMER_ERROR, error);
