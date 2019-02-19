import TYPES from '../types';
import ICustomer from '../models/Customer';

export const fetchCustomer = () => ({ type: TYPES.CUSTOMER.GET_CUSTOMERS_REQUEST });
export const fetchCustomersSuccess = (customers: ICustomer[]) => ({
  type: TYPES.CUSTOMER.GET_CUSTOMERS_SUCCESS,
  payload: customers
});

export const fetchCustomerById = (id: string | number) => ({
  type: TYPES.CUSTOMER.GET_CUSTOMER_BY_ID_REQUEST,
  payload: id
});
export const fetchCustomerByIdSuccess = (customer: ICustomer) => ({
  type: TYPES.CUSTOMER.GET_CUSTOMER_BY_ID_SUCCESS,
  payload: customer
});
