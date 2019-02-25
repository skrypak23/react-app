import { ActionType } from 'typesafe-actions';
import * as ProductActions from '../actions';
import * as PRODUCT_TYPES from '../actions/types';
import { State, initialState } from '../states';

type Action = ActionType<typeof ProductActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case PRODUCT_TYPES.GET_PRODUCTS_REQUEST:
    case PRODUCT_TYPES.CREATE_PRODUCT_REQUEST:
    case PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_TYPES.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, loading: false, error: null };
    case PRODUCT_TYPES.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
        error: null
      };
    case PRODUCT_TYPES.GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, product: action.payload, loading: false, error: null };
    case PRODUCT_TYPES.EDIT_PRODUCT_SUCCESS:
      const updatedProducts = state.products.map(product => {
        if (product.id === action.payload.id) return action.payload;
        return product;
      });
      return {
        ...state,
        product: action.payload,
        products: updatedProducts,
        loading: false,
        error: null
      };
    case PRODUCT_TYPES.DELETE_PRODUCT_SUCCESS:
      const filteredProducts = state.products.filter(
        product => product.id !== action.payload.id
      );
      return { ...state, products: filteredProducts };
    case PRODUCT_TYPES.RESET_PRODUCT:
      return { ...state, product: null, loading: false, error: null };
    case PRODUCT_TYPES.FETCH_PRODUCT_ERROR:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default reducer;
