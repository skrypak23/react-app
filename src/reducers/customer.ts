import { ActionType } from 'typesafe-actions';
import { CustomerActions } from '../actions';
import { CUSTOMER_TYPES } from '../types';
import ICustomer from '../models/Customer';
import TState from '../common/types/TState';

type State = TState & {
  readonly customer: ICustomer | null;
  customers: ReadonlyArray<ICustomer>;
};
type Action = ActionType<typeof CustomerActions>;

const initialState: State = {
  loading: false,
  error: null,
  customer: null,
  customers: []
};

const reducer = (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  console.log(action);
  switch (type) {
    case CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST:
      console.log(type);
      return state;
    default:
      return state;
  }
};

export default reducer;
