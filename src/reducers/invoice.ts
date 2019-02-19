import TYPES from '../types';
import IInvoice from '../models/Invoice';
import TAction from '../common/types/TAction';
import TState from '../common/types/TState';

type State = TState & {
  customer: IInvoice | null;
  customers: IInvoice[];
};

const initialState = {
  loading: false,
  error: null,
  customer: null,
  customers: []
};

const reducer = (state: State = initialState, action: TAction): State => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;