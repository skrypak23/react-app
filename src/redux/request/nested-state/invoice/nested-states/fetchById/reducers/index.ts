import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchInvoiceByIdActions, FetchInvoiceByIdTypes } from '../actions';

type Action = ActionType<typeof FetchInvoiceByIdActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
