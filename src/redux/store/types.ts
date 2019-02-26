import { StateType, ActionType } from 'typesafe-actions';
import State from '.';
import Reducer from '../rootReducer';
import * as CustomerActions from '../customer/actions';
import * as ProductActions from '../customer/actions';
import * as InvoiceActions from '../customer/actions';
import * as InvoiceItemActions from '../customer/actions';

const Actions = {
  ...CustomerActions,
  ...ProductActions,
  ...InvoiceActions,
  ...InvoiceItemActions
};

export type Store = StateType<typeof State>;
export type RootAction = ActionType<typeof Actions>;
export type RootState = StateType<typeof Reducer>;
