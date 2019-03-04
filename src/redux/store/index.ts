import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../rootReducer';
import rootEpic from '../rootEpic';
import { RootAction, RootState } from './types';

const epicMiddleware = createEpicMiddleware<any, any, any>();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
export default store;
