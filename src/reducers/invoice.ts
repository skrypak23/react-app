import { ActionType } from 'typesafe-actions';
import { InvoiceActions } from '../actions';
import { INVOICE_TYPES } from '../types';
import IInvoice from '../models/Invoice';
import TState from '../common/types/TState';

type State = TState & {
  readonly customer: IInvoice | null;
  customers: ReadonlyArray<IInvoice>;
};
type Action = ActionType<typeof InvoiceActions>;

const initialState: State = {
  loading: false,
  error: null,
  customer: null,
  customers: []
};

const reducer = (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
