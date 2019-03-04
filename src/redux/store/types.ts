import { StateType, ActionType } from 'typesafe-actions';
import State from '.';
import Reducer from '../rootReducer';
import * as CustomerActions from '../customer/actions';
import * as ProductActions from '../product/actions';
import * as InvoiceActions from '../invoice/actions';
import * as InvoiceItemActions from '../invoice-item/actions';
import * as AlertActions from '../alert/actions';
import {
  CustomerRequest,
  ProductRequest,
  InvoiceItemRequest,
  InvoiceRequest
} from '../../redux/request/actions';
const Actions = {
  ...ProductActions,
  ...CustomerActions,
  ...InvoiceActions,
  ...InvoiceItemActions,
  ...AlertActions,
  ...InvoiceItemRequest.Action,
  ...InvoiceRequest.Action,
  ...ProductRequest.Action,
  ...CustomerRequest.Action
};

export type Store = StateType<typeof State>;
export type RootAction = ActionType<typeof Actions>;
export type RootState = StateType<typeof Reducer>;
