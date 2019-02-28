import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchProductsTypes, FetchProductActions } from '../actions';

type Action = ActionType<typeof FetchProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchProductsTypes.FETCH_PRODUCTS_REQUEST:
      return { ...state, data: [], loading: true, error: null };
    case FetchProductsTypes.FETCH_PRODUCTS_SUCCESS:
      return { ...state, data: [...action.payload], loading: false, error: null };
    case FetchProductsTypes.FETCH_PRODUCTS_FAILURE:
      return { ...state, data: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
