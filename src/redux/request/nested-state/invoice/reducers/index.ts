import { combineReducers } from 'redux';
import create from '../nested-states/create/reducers';
import update from '../nested-states/update/reducers';
import remove from '../nested-states/delete/reducers';
import fetch from '../nested-states/fetch/reducers';
import fetchById from '../nested-states/fetchById/reducers';

export default combineReducers({
  create,
  update,
  remove,
  fetch,
  fetchById
});
