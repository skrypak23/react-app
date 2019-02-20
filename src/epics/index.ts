import { combineEpics } from 'redux-observable';
import fetchAllDataEpic from './fetchEpic';

export default combineEpics(...fetchAllDataEpic);
