import TYPES from '../types';
import IProduct from '../models/Product';
import TAction from '../common/types/TAction';
import TState from '../common/types/TState';

type State = TState & {
  product: IProduct | null;
  products: IProduct[];
};

const initialState = {
  loading: false,
  error: null,
  product: null,
  products: []
};

const reducer = (state: State = initialState, action: TAction): State => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;