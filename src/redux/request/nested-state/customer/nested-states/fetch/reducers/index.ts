import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchCustomersTypes, FetchCustomerActions } from '../actions';

type Action = ActionType<typeof FetchCustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchCustomersTypes.FETCH_CUSTOMERS_REQUEST:
      return { ...state, data: [], loading: true, error: null };
    case FetchCustomersTypes.FETCH_CUSTOMERS_SUCCESS:
      return { ...state, data: [...action.payload], loading: false, error: null };
    case FetchCustomersTypes.FETCH_CUSTOMERS_FAILURE:
      return { ...state, data: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
