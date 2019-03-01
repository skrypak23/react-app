import { ActionType } from 'typesafe-actions';
import { unionWith, eqBy, prop, propEq, reject } from 'ramda';
import * as CustomerActions from '../actions';
import * as CUSTOMER_TYPES from '../actions/types';
import { State, initialState } from '../states';
import ICustomer from '../../../shared/models/Customer';

export type Action = ActionType<typeof CustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CUSTOMER_TYPES.SET_CUSTOMER_DATA:
      const entities = unionWith<ICustomer>(
          eqBy(prop('id')),
          action.payload,
          state.entities
      );
      return {
        ...state,
        entities
      };
    case CUSTOMER_TYPES.DELETE_CUSTOMER: {
      const entities = reject<ICustomer>(propEq('id', action.payload.id), state.entities);
      return {
        ...state,
        entities
      };
    }
    default:
      return state;
  }
};

export default reducer;
