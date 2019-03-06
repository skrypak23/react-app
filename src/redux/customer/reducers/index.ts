import { ActionType } from 'typesafe-actions';
import * as CustomerActions from '../actions';
import * as CUSTOMER_TYPES from '../actions/types';
import { State, initialState } from '../states';
import ICustomer from '../../../shared/models/Customer';
import { union, deleteData } from '../../../shared/utils';

export type Action = ActionType<typeof CustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CUSTOMER_TYPES.SET_CUSTOMER_DATA:
      const entities = union<ICustomer>(action.payload, state.entities);
      return {
        ...state,
        entities,
      };
    case CUSTOMER_TYPES.DELETE_CUSTOMER_DATA: {
      const entities = deleteData<ICustomer>(action.payload, state.entities);
      return {
        ...state,
        entities,
      };
    }
    default:
      return state;
  }
};

export default reducer;
