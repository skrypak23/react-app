import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { CreateCustomerActions, CreateCustomerTypes } from '../actions';

type Action = ActionType<typeof CreateCustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CreateCustomerTypes.CREATE_CUSTOMER_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case CreateCustomerTypes.CREATE_CUSTOMER_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case CreateCustomerTypes.CREATE_CUSTOMER_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
