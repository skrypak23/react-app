import TYPES from '../types';
import ICustomer from '../models/Customer';
import TAction from '../common/types/TAction';
import TState from '../common/types/TState';

type State = TState & {
  customer: ICustomer | null;
  customers: ICustomer[];
};

const initialState = {
  loading: false,
  error: null,
  customer: null,
  customers: []
};

const reducer = (state: State = initialState, action: TAction): State => {
  const { type, payload } = action;
  console.log(type, payload)
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
