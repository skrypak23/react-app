import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchProductByIdTypes, FetchProductByIdActions } from '../actions';

type Action = ActionType<typeof FetchProductByIdActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case FetchProductByIdTypes.RESET_PRODUCT:
      return { ...state, data: null, loading: false, error: null };
    case FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
