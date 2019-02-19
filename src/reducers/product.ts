import { ActionType } from 'typesafe-actions';
import { ProductActions } from '../actions';
import { PRODUCT_TYPES } from '../types';
import IProduct from '../models/Product';
import TState from '../common/types/TState';

type State = TState & {
  readonly product: IProduct | null;
  products: ReadonlyArray<IProduct>;
};
type Action = ActionType<typeof ProductActions>;

const initialState: State = {
  loading: false,
  error: null,
  product: null,
  products: []
};

const reducer = (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
