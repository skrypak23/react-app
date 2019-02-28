import { initialState, State } from '../states';
import { ActionType } from 'typesafe-actions';
import { UpdateInvoiceItemActions, UpdateInvoiceItemTypes } from '../actions';

type Action = ActionType<typeof UpdateInvoiceItemActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case UpdateInvoiceItemTypes.UPDATE_INVOICE_ITEM_REQUEST:
      return { ...state, data: null, loading: true, error: null };
    case UpdateInvoiceItemTypes.UPDATE_INVOICE_ITEM_SUCCESS:
      return { ...state, data: action.payload, loading: false, error: null };
    case UpdateInvoiceItemTypes.UPDATE_INVOICE_ITEM_FAILURE:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
