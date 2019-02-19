import { ActionType } from 'typesafe-actions';
import { InvoiceItemActions } from '../actions';
import { INVOICE_ITEMS_TYPES } from '../types';
import IInvoiceItem from '../models/InvoiceItem';
import TState from '../common/types/TState';

type State = TState & {
  readonly invoiceItem: IInvoiceItem | null;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
};
type Action = ActionType<typeof InvoiceItemActions>;

const initialState: State = {
  loading: false,
  error: null,
  invoiceItem: null,
  invoiceItems: []
};

const reducer = (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
