import { ActionType } from 'typesafe-actions';
import * as ProductActions from '../actions';
import * as PRODUCT_TYPES from '../actions/types';
import { State, initialState } from '../states';
import { filteredData, mapedData } from '../../../shared/utils';

type Action = ActionType<typeof ProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case PRODUCT_TYPES.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    case PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.payload
      };
    case PRODUCT_TYPES.EDIT_PRODUCT_SUCCESS: {
      const products = mapedData(state.products, action.payload);
      return {
        ...state,
        product: action.payload,
        products
      };
    }
    case PRODUCT_TYPES.DELETE_PRODUCT_SUCCESS:
      const products = filteredData(state.products, action.payload.id);
      return { ...state, products };
    case PRODUCT_TYPES.RESET_PRODUCT:
      return { ...state, product: null };
    case PRODUCT_TYPES.FETCH_PRODUCT_ERROR:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default reducer;
