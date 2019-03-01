import {
  CreateCustomerActions,
  CreateCustomerTypes
} from '../nested-states/create/actions';
import {
  UpdateCustomerActions,
  UpdateCustomerTypes
} from '../nested-states/update/actions';
import {
  DeleteCustomerActions,
  DeleteCustomerTypes
} from '../nested-states/delete/actions';
import {
  FetchCustomerActions,
  FetchCustomersTypes
} from '../nested-states/fetch/actions';
import {
  FetchCustomerByIdActions,
  FetchCustomerByIdTypes
} from '../nested-states/fetchById/actions';

export const Action = {
  ...CreateCustomerActions,
  ...UpdateCustomerActions,
  ...DeleteCustomerActions,
  ...FetchCustomerActions,
  ...FetchCustomerByIdActions
};

export const Types = {
  ...CreateCustomerTypes,
  ...UpdateCustomerTypes,
  ...DeleteCustomerTypes,
  ...FetchCustomersTypes,
  ...FetchCustomerByIdTypes
};
