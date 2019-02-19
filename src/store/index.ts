import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

export default store;