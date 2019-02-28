import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { DeleteProductActions, DeleteProductTypes } from '../actions';

type Action = ActionType<typeof DeleteProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case DeleteProductTypes.DELETE_PRODUCT_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case DeleteProductTypes.DELETE_PRODUCT_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case DeleteProductTypes.DELETE_PRODUCT_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
