import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { CreateInvoiceItemActions, CreateInvoiceItemTypes } from '../actions';

type Action = ActionType<typeof CreateInvoiceItemActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CreateInvoiceItemTypes.CREATE_INVOICE_ITEM_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case CreateInvoiceItemTypes.CREATE_INVOICE_ITEM_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case CreateInvoiceItemTypes.CREATE_INVOICE_ITEM_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
