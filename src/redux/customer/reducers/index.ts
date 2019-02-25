import { ActionType, getType } from 'typesafe-actions';
import * as CustomerActions from '../actions';
import {CUSTOMER_TYPES} from "../../../types";
import { State, initialState } from '../states'

export type Action = ActionType<typeof CustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST:
    case CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST:
    case CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case CUSTOMER_TYPES.GET_CUSTOMERS_SUCCESS:
      return { ...state, customers: [...action.payload], loading: false, error: null };
    case CUSTOMER_TYPES.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        customer: action.payload,
        loading: false,
        error: null
      };
    case CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_SUCCESS:
      return { ...state, customer: action.payload, loading: false, error: null };
    case CUSTOMER_TYPES.EDIT_CUSTOMER_SUCCESS:
      const updatedCustomers = state.customers.map(customer => {
        if (customer.id === action.payload.id) return action.payload;
        return customer;
      });
      return {
        ...state,
        customer: action.payload,
        customers: updatedCustomers,
        loading: false,
        error: null
      };
    case CUSTOMER_TYPES.DELETE_CUSTOMER_SUCCESS:
      const filteredCustomers = state.customers.filter(
        customer => customer.id !== action.payload.id
      );
      return { ...state, customers: filteredCustomers, loading: false, error: null };
    case CUSTOMER_TYPES.RESET_CUSTOMER:
      return { ...state, customer: null, loading: false, error: null };
    case getType(CustomerActions.setError):
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
