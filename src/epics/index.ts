import { combineEpics } from 'redux-observable';
import { getCustomersEpic } from './customer';

export default combineEpics(getCustomersEpic);
