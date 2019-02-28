import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { UpdateInvoiceActions, UpdateInvoiceTypes } from '../actions';

type Action = ActionType<typeof UpdateInvoiceActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case UpdateInvoiceTypes.UPDATE_INVOICE_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case UpdateInvoiceTypes.UPDATE_INVOICE_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case UpdateInvoiceTypes.UPDATE_INVOICE_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
