import { action, createStandardAction } from 'typesafe-actions';
import ICustomer from '../../../../../../../shared/models/Customer';
import { URL_ALL_CUSTOMERS } from '../../../../../../../shared/utils/api';

export enum CreateCustomerTypes {
  CREATE_CUSTOMER_REQUEST = '@invoice-app/customer/CREATE_CUSTOMER_REQUEST',
  CREATE_CUSTOMER_SUCCESS = '@invoice-app/customer/CREATE_CUSTOMER_SUCCESS',
  CREATE_CUSTOMER_FAILURE = '@invoice-app/customer/CREATE_CUSTOMER_FAILURE'
}

export const CreateCustomerActions = {
  createCustomerRequest: (customer: ICustomer) =>
    action(CreateCustomerTypes.CREATE_CUSTOMER_REQUEST, {
      url: URL_ALL_CUSTOMERS,
      body: customer
    }),
  createCustomerSuccess: createStandardAction(
    CreateCustomerTypes.CREATE_CUSTOMER_SUCCESS
  )<ICustomer>(),
  createCustomerFailure: createStandardAction(
    CreateCustomerTypes.CREATE_CUSTOMER_FAILURE
  )<Error>()
};
