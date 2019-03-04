import { action, createStandardAction } from 'typesafe-actions';
import ICustomer from '../../../../../../../shared/models/Customer';
import { URL_ALL_CUSTOMERS } from '../../../../../../../shared/utils/api';
import { ID } from '../../../../../../../shared/typing/records';

export enum FetchCustomerByIdTypes {
  FETCH_CUSTOMERS_BY_ID_REQUEST = '@invoice-app/customer/FETCH_CUSTOMERS_BY_ID_REQUEST',
  FETCH_CUSTOMERS_BY_ID_SUCCESS = '@invoice-app/customer/FETCH_CUSTOMERS_BY_ID_SUCCESS',
  FETCH_CUSTOMERS_BY_ID_FAILURE = '@invoice-app/customer/FETCH_CUSTOMERS_BY_ID_FAILURE',
  RESET_CUSTOMER = '@invoice-app/customer/RESET_CUSTOMER',
}

export const FetchCustomerByIdActions = {
  fetchCustomerByIdRequest: (id: ID) =>
    action(FetchCustomerByIdTypes.FETCH_CUSTOMERS_BY_ID_REQUEST, {
      url: `${URL_ALL_CUSTOMERS}/${id}`
    }),
  fetchCustomerByIdSuccess: createStandardAction(
    FetchCustomerByIdTypes.FETCH_CUSTOMERS_BY_ID_SUCCESS
  )<ICustomer>(),
  resetCustomer: createStandardAction(
    FetchCustomerByIdTypes.RESET_CUSTOMER
  )<undefined>(),
  fetchCustomerByIdFailure: createStandardAction(
    FetchCustomerByIdTypes.FETCH_CUSTOMERS_BY_ID_FAILURE
  )<Error>()
};
