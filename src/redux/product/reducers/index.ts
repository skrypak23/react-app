import { ActionType } from 'typesafe-actions';
import * as ProductActions from '../actions';
import * as PRODUCT_TYPES from '../actions/types';
import { State, initialState } from '../states';
import IProduct from '../../../shared/models/Product';
import { union, deleteData } from '../../../shared/utils';

type Action = ActionType<typeof ProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case PRODUCT_TYPES.SET_PRODUCT_DATA:
      const entities = union<IProduct>(action.payload, state.entities);
      return {
        ...state,
        entities
      };
    case PRODUCT_TYPES.DELETE_PRODUCT_DATA: {
      const entities = deleteData<IProduct>(action.payload, state.entities);
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
