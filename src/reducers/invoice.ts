import { ActionType } from 'typesafe-actions';
import { InvoiceActions } from '../actions';
import { INVOICE_TYPES } from '../types';
import IInvoice from '../models/Invoice';
import TState from '../common/types/TState';

export type State = TState & {
  readonly invoice: IInvoice | null;
  invoices: ReadonlyArray<IInvoice>;
};
type Action = ActionType<typeof InvoiceActions>;

const initialState: State = {
  loading: false,
  error: null,
  invoice: null,
  invoices: []
};

const reducer = (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case INVOICE_TYPES.GET_INVOICES_REQUEST:
      return { ...state, loading: true, error: null };
    case INVOICE_TYPES.GET_INVOICES_SUCCESS:
      return { ...state, invoices: payload as IInvoice[], loading: false, error: null };
    case INVOICE_TYPES.FETCH_INVOICE_ERROR:
      return { ...state, loading: false, error: payload as string };
    default:
      return state;
  }
};

export default reducer;
