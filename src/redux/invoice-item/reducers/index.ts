import { ActionType } from 'typesafe-actions';
import * as InvoiceItemActions from '../actions';
import * as INVOICE_ITEMS_TYPES from '../actions/types';
import { State, initialState } from '../states';
import {
  filteredData,
  filteredDataByIdx,
  mapedData,
  mapedDataByIdx
} from '../../../shared/utils';

type Action = ActionType<typeof InvoiceItemActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
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
      };
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_SUCCESS:
      return {
        ...state,
        invoiceItems: [...action.payload]
      };
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL: {
      const invoiceItems = filteredDataByIdx(
        state.invoiceItems,
        action.payload
      );
      return { ...state, invoiceItems };
    }
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_SUCCESS: {
      const invoiceItems = filteredData(state.invoiceItems, action.payload.id);
      return {
        ...state,
        invoiceItems
      };
    }
    case INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM:
      return {
        ...state,
        invoiceItems: [...state.invoiceItems, action.payload]
      };
    case INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_SUCCESS: {
      const { payload: invoiceItem } = action;
      const invoiceItems = mapedData(state.invoiceItems, invoiceItem);
      return {
        ...state,
        invoiceItems,
        invoiceItem
      };
    }
    case INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_LOCAL_REQUEST:
      const invoiceItems = mapedDataByIdx(
        state.invoiceItems,
        action.payload.invoiceItem
      );
      return {
        ...state,
        invoiceItems,
        invoiceItem: null
      };
    case INVOICE_ITEMS_TYPES.RESET_INVOICE_ITEMS:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
