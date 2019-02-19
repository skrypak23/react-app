import TYPES from '../types';
import IInvoiceItem from '../models/InvoiceItem';
import TAction from '../common/types/TAction';
import TState from '../common/types/TState';

type State = TState & {
  invoiceItem: IInvoiceItem | null;
  invoiceItems: IInvoiceItem[];
};

const initialState = {
  loading: false,
  error: null,
  invoiceItem: null,
  invoiceItems: []
};

const reducer = (state: State = initialState, action: TAction): State => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;