import { combineEpics } from 'redux-observable';
import fetchAllDataEpic from './fetchEpic';
import createDataEpic from './createDataEpic';

export default combineEpics(...fetchAllDataEpic, ...createDataEpic);
