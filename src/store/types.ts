import { StateType, ActionType } from 'typesafe-actions';
import State from './index';
import Reducer from '../reducers';
import * as Actions from '../actions';

export type Store = StateType<typeof State>;
export type RootAction = ActionType<typeof Actions>;
export type RootState = StateType<typeof Reducer>;
