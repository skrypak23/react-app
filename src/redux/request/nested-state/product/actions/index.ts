import {
  CreateProductActions,
  CreateProductTypes
} from '../nested-states/create/actions';
import {
  UpdateProductActions,
  UpdateProductTypes
} from '../nested-states/update/actions';
import {
  DeleteProductActions,
  DeleteProductTypes
} from '../nested-states/delete/actions';
import { FetchProductActions, FetchProductsTypes } from '../nested-states/fetch/actions';
import {
  FetchProductByIdActions,
  FetchProductByIdTypes
} from '../nested-states/fetchById/actions';

export const Action = {
  ...CreateProductActions,
  ...UpdateProductActions,
  ...DeleteProductActions,
  ...FetchProductByIdActions,
  ...FetchProductActions
};

export const Types = {
  ...CreateProductTypes,
  ...UpdateProductTypes,
  ...DeleteProductTypes,
  ...FetchProductByIdTypes,
  ...FetchProductsTypes
};
