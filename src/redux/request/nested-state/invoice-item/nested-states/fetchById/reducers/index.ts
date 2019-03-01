import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchInvoiceItemByIdActions, FetchInvoiceItemByIdTypes } from '../actions';

type Action = ActionType<typeof FetchInvoiceItemByIdActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case FetchInvoiceItemByIdTypes.FILL_INVOICE_ITEM:
      return { ...state, data: action.payload, loading: false, error: null };
    case FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
