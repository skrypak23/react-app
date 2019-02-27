import { StateType, ActionType } from 'typesafe-actions';
import State from '.';
import Reducer from '../rootReducer';
import * as CustomerActions from '../customer/actions';
import * as ProductActions from '../product/actions';
import * as InvoiceActions from '../invoice/actions';
import * as InvoiceItemActions from '../invoice-item/actions';

const Actions = {
  ...ProductActions,
  ...CustomerActions,
  ...InvoiceActions,
  ...InvoiceItemActions
};

export type Store = StateType<typeof State>;
export type RootAction = ActionType<typeof Actions>;
export type RootState = StateType<typeof Reducer>;
