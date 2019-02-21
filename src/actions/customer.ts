import {action} from 'typesafe-actions';
import ICustomer from '../models/Customer';
import {CUSTOMER_TYPES} from '../types';
import {URL_ALL_CUSTOMERS} from '../api';

export const fetchAllCustomers = () =>
    action(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST, URL_ALL_CUSTOMERS);
export const fetchDataSuccess = (customers: ICustomer[]) =>
    action(CUSTOMER_TYPES.GET_CUSTOMERS_SUCCESS, customers);

export const fetchCustomerById = (id: string | number) =>
    action(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST, `${URL_ALL_CUSTOMERS}/${id}`);
export const fetchDataByIdSuccess = (customer: ICustomer) =>
    action(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_SUCCESS, customer);

export const createCustomer = (customer: ICustomer) =>
    action(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST, {url: URL_ALL_CUSTOMERS, body: customer});
export const createSuccess = (customer: ICustomer) =>
    action(CUSTOMER_TYPES.CREATE_CUSTOMER_SUCCESS, customer);

export const editCustomer = (id: string | number, customer: ICustomer) =>
    action(CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST, {url: `${URL_ALL_CUSTOMERS}/${id}`, body: customer});
export const editSuccess = (customer: ICustomer) =>
    action(CUSTOMER_TYPES.EDIT_CUSTOMER_SUCCESS, customer);

export const deleteCustomer = (id: string | number) =>
    action(CUSTOMER_TYPES.DELETE_CUSTOMER_REQUEST, {url: `${URL_ALL_CUSTOMERS}/${id}`});
export const deleteCustomerSuccess = (customer: ICustomer) =>
    action(CUSTOMER_TYPES.DELETE_CUSTOMER_SUCCESS, customer);

export const resetCustomer = () =>
    action(CUSTOMER_TYPES.RESET_CUSTOMER, 'error');
export const setError = (error: string) =>
    action(CUSTOMER_TYPES.FETCH_CUSTOMER_ERROR, error);
