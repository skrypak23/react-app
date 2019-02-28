import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchInvoiceItemActions, FetchInvoiceItemsTypes } from '../actions';

type Action = ActionType<typeof FetchInvoiceItemActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchInvoiceItemsTypes.FETCH_INVOICE_ITEMS_REQUEST:
      return { ...state, data: [], loading: true, error: null };
    case FetchInvoiceItemsTypes.FETCH_INVOICE_ITEMS_SUCCESS:
      return { ...state, data: [...action.payload], loading: false, error: null };
    case FetchInvoiceItemsTypes.FETCH_INVOICE_ITEMS_FAILURE:
      return { ...state, data: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
