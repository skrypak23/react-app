import { ActionType } from 'typesafe-actions';
import { unionWith, eqBy, prop, propEq, reject } from 'ramda';
import * as ProductActions from '../actions';
import * as PRODUCT_TYPES from '../actions/types';
import { State, initialState } from '../states';
import IProduct from '../../../shared/models/Product';

type Action = ActionType<typeof ProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case PRODUCT_TYPES.SET_PRODUCT_DATA:
      const entities = unionWith<IProduct>(
        eqBy(prop('id')),
        action.payload,
        state.entities
      );
      return {
        ...state,
        entities
      };
    case PRODUCT_TYPES.DELETE_PRODUCT: {
      const entities = reject<IProduct>(propEq('id', action.payload.id), state.entities);
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
