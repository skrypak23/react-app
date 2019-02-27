import { ActionType } from 'typesafe-actions';
import * as CustomerActions from '../actions';
import * as CUSTOMER_TYPES from '../actions/types';
import { State, initialState } from '../states';
import { filteredData, mapedData } from '../../../shared/utils';

export type Action = ActionType<typeof CustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST:
    case CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST:
    case CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST:
    case CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case CUSTOMER_TYPES.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: [...action.payload],
        loading: false,
        error: null
      };
    case CUSTOMER_TYPES.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        customer: action.payload,
        loading: false,
        error: null
      };
    case CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        loading: false,
        error: null
      };
    case CUSTOMER_TYPES.EDIT_CUSTOMER_SUCCESS: {
      const { payload: customer } = action;
      const customers = mapedData(state.customers, customer);
      return {
        ...state,
        customer,
        customers,
        loading: false,
        error: null
      };
    }
    case CUSTOMER_TYPES.DELETE_CUSTOMER_SUCCESS: {
      const customers = filteredData(state.customers, action.payload.id);
      return {
        ...state,
        customers,
        loading: false,
        error: null
      };
    }
    case CUSTOMER_TYPES.RESET_CUSTOMER:
      return { ...state, customer: null, loading: false, error: null };
    case CUSTOMER_TYPES.FETCH_CUSTOMER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
