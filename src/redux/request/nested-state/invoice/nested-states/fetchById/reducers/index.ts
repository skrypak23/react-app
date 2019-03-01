import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { FetchInvoiceByIdActions, FetchInvoiceByIdTypes } from '../actions';
import IInvoice from '../../../../../../../shared/models/Invoice';

type Action = ActionType<typeof FetchInvoiceByIdActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case FetchInvoiceByIdTypes.RESET_INVOICE:
      return { ...state, data: null, loading: false, error: null };
    case FetchInvoiceByIdTypes.FILL_INVOICE:
      return { ...state, data: action.payload, loading: false, error: null };
    case FetchInvoiceByIdTypes.CALCULATE_TOTAL:
      return {
        ...state,
        data: { ...state.data, total: +action.payload.toFixed(2) } as IInvoice
      };
    case FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
