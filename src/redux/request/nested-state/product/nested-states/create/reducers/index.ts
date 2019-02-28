import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { CreateProductActions, CreateProductTypes } from '../actions';

type Action = ActionType<typeof CreateProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CreateProductTypes.CREATE_PRODUCT_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case CreateProductTypes.CREATE_PRODUCT_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case CreateProductTypes.CREATE_PRODUCT_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
