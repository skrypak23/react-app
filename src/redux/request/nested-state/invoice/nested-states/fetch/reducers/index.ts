import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchInvoiceActions, FetchInvoicesTypes } from '../actions';

type Action = ActionType<typeof FetchInvoiceActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchInvoicesTypes.FETCH_INVOICES_REQUEST:
      return { ...state, data: [], loading: true, error: null };
    case FetchInvoicesTypes.FETCH_INVOICES_SUCCESS:
      return { ...state, data: [...action.payload], loading: false, error: null };
    case FetchInvoicesTypes.FETCH_INVOICES_FAILURE:
      return { ...state, data: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
