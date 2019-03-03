import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchCustomerByIdTypes, FetchCustomerByIdActions } from '../actions';

type Action = ActionType<typeof FetchCustomerByIdActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchCustomerByIdTypes.FETCH_CUSTOMERS_BY_ID_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case FetchCustomerByIdTypes.FETCH_CUSTOMERS_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case FetchCustomerByIdTypes.RESET_CUSTOMER:
      return { ...state, data: null, loading: false, error: null };
    case FetchCustomerByIdTypes.FETCH_CUSTOMERS_BY_ID_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
