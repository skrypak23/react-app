import { action, createAction, createStandardAction } from 'typesafe-actions';
import ICustomer from '../shared/models/Customer';
import { CUSTOMER_TYPES } from '../types';
import { URL_ALL_CUSTOMERS } from '../shared/services';
import { ID } from '../common/types';

export const fetchAllCustomers = () =>
  action(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST, URL_ALL_CUSTOMERS);
export const fetchDataSuccess = createStandardAction(CUSTOMER_TYPES.GET_CUSTOMERS_SUCCESS)<ICustomer[]>();

export const fetchCustomerById = (id: ID) =>
  action(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST, `${URL_ALL_CUSTOMERS}/${id}`);
export const fetchDataByIdSuccess = createStandardAction(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_SUCCESS)<ICustomer>();

export const createCustomer = (customer: ICustomer) =>
  action(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST, {
    url: URL_ALL_CUSTOMERS,
    body: customer
  });
export const createSuccess = createStandardAction(CUSTOMER_TYPES.CREATE_CUSTOMER_SUCCESS)<
  ICustomer
>();

export const editCustomer = (id: ID, customer: ICustomer) =>
  action(CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST, {
    url: `${URL_ALL_CUSTOMERS}/${id}`,
    body: customer
  });
export const editSuccess = createStandardAction(CUSTOMER_TYPES.EDIT_CUSTOMER_SUCCESS)<
  ICustomer
>();

export const deleteCustomer = (id: ID) =>
  action(CUSTOMER_TYPES.DELETE_CUSTOMER_REQUEST, { url: `${URL_ALL_CUSTOMERS}/${id}` });
export const deleteSuccess = createStandardAction(CUSTOMER_TYPES.DELETE_CUSTOMER_SUCCESS)<
  ICustomer
>();

export const resetCustomer = createStandardAction(CUSTOMER_TYPES.RESET_CUSTOMER)<
  undefined
>();
export const setError = createStandardAction(CUSTOMER_TYPES.FETCH_CUSTOMER_ERROR)<
  string
>();
