import { ActionType } from 'typesafe-actions';
import * as ALERT_TYPES from '../actions/types';
import * as AlertActions from '../actions';
import { State, initialState } from '../states';

export type Action = ActionType<typeof AlertActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ALERT_TYPES.SET_SUCCESS_ALERT:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message
      };
      case ALERT_TYPES.SET_FAILURE_ALERT:
      return {
        ...state,
        failure: action.payload.failure,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default reducer;
