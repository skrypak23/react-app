import {combineEpics} from 'redux-observable';
import fetchAllDataEpic from './fetchEpic';
import createDataEpic from './createDataEpic';
import fetchByIdEpic from './fetchByIdEpic';
import editDataEpic from './editDataEpic';
import deleteDataEpic from './deleteDataEpic';

export default combineEpics(...fetchAllDataEpic, ...createDataEpic, ...fetchByIdEpic, ...editDataEpic, ...deleteDataEpic);
