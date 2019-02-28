import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { UpdateCustomerActions, UpdateCustomerTypes } from '../actions';

type Action = ActionType<typeof UpdateCustomerActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case UpdateCustomerTypes.UPDATE_CUSTOMER_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case UpdateCustomerTypes.UPDATE_CUSTOMER_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case UpdateCustomerTypes.UPDATE_CUSTOMER_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
