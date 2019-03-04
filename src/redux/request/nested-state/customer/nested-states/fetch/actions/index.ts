import { action, createStandardAction } from 'typesafe-actions';
import ICustomer from '../../../../../../../shared/models/Customer';
import { URL_ALL_CUSTOMERS } from '../../../../../../../shared/utils/api';

export enum FetchCustomersTypes {
  FETCH_CUSTOMERS_REQUEST = '@invoice-app/customer/FETCH_CUSTOMERS_REQUEST',
  FETCH_CUSTOMERS_SUCCESS = '@invoice-app/customer/FETCH_CUSTOMERS_SUCCESS',
  FETCH_CUSTOMERS_FAILURE = '@invoice-app/customer/FETCH_CUSTOMERS_FAILURE'
}

export const FetchCustomerActions = {
  fetchAllCustomersRequest: () =>
    action(FetchCustomersTypes.FETCH_CUSTOMERS_REQUEST, { url: URL_ALL_CUSTOMERS }),
  fetchCustomersSuccess: createStandardAction(
    FetchCustomersTypes.FETCH_CUSTOMERS_SUCCESS
  )<ICustomer[]>(),
  fetchCustomersFailure: createStandardAction(
    FetchCustomersTypes.FETCH_CUSTOMERS_FAILURE
  )<Error>()
};
