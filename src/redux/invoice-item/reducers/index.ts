import { ActionType } from 'typesafe-actions';
import * as InvoiceItemActions from '../actions';
import * as INVOICE_ITEMS_TYPES from '../actions/types';
import { State, initialState } from '../states';

type Action = ActionType<typeof InvoiceItemActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST:
    case INVOICE_ITEMS_TYPES.CREATE_INVOICE_ITEMS_REQUEST:
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_REQUEST:
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case INVOICE_ITEMS_TYPES.FILL_INVOICE_ITEMS:
      const foundItem = state.invoiceItems[action.payload];
      return {
        ...state,
        invoiceItem: foundItem
      };
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_SUCCESS:
      return {
        ...state,
        invoiceItem: action.payload,
        loading: false,
        error: null
      };
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_SUCCESS:
      return {
        ...state,
        invoiceItems: [...action.payload]
      };
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL:
      const filteredItems = state.invoiceItems.filter(
        (_, idx: number) => idx !== action.payload
      );
      return { ...state, invoiceItems: filteredItems };
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_SUCCESS:
      const itemsWithoutDeleted = state.invoiceItems.filter(
        iI => iI.id !== action.payload.id
      );
      return { ...state, invoiceItems: itemsWithoutDeleted };
    case INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM:
      return {
        ...state,
        invoiceItems: [...state.invoiceItems, action.payload]
      };
    case INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_SUCCESS:
      const filteredData = state.invoiceItems.map(iI => {
        if (iI.id === action.payload.id) return action.payload;
        return iI;
      });
      return {
        ...state,
        invoiceItems: [...filteredData],
        invoiceItem: action.payload
      };
    case INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_LOCAL_REQUEST:
      const filtered = state.invoiceItems.map((iI, idx) => {
        if (idx === action.payload.id) return action.payload.invoiceItem;
        return iI;
      });
      console.log(filtered, action.payload);
      return {
        ...state,
        invoiceItems: [...filtered],
        invoiceItem: null
      };
    case INVOICE_ITEMS_TYPES.RESET_INVOICE_ITEMS:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
