import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { UpdateProductActions, UpdateProductTypes } from '../actions';

type Action = ActionType<typeof UpdateProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case UpdateProductTypes.UPDATE_PRODUCT_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case UpdateProductTypes.UPDATE_PRODUCT_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case UpdateProductTypes.UPDATE_PRODUCT_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
