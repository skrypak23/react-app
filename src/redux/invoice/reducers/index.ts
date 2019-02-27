import { ActionType } from 'typesafe-actions';
import * as InvoiceActions from '../actions';
import * as INVOICE_TYPES from '../actions/types';
import { State, initialState } from '../states';
import IInvoice from '../../../shared/models/Invoice';
import { filteredData, mapedData } from '../../../shared/utils';

type Action = ActionType<typeof InvoiceActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_TYPES.GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
      };
    case INVOICE_TYPES.CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    case INVOICE_TYPES.GET_INVOICE_BY_ID_SUCCESS:
      return {
        ...state,
        invoice: action.payload,
      };
    case INVOICE_TYPES.EDIT_INVOICE_SUCCESS: {
      const { payload: invoice } = action;
      const invoices = mapedData(state.invoices, invoice);
      return {
        ...state,
        invoice,
        invoices,
      };
    }
    case INVOICE_TYPES.DELETE_INVOICE_SUCCESS: {
      const invoices = filteredData(state.invoices, action.payload.id);
      return { ...state, invoices };
    }
    case INVOICE_TYPES.RESET_INVOICE:
      return { ...state, invoice: null };
    case INVOICE_TYPES.FILL_INVOICE:
      return {
        ...state,
        invoice: { ...state.invoice, ...action.payload },
      };
    case INVOICE_TYPES.CALCULATE_TOTAL:
      return {
        ...state,
        invoice: { ...state.invoice, total: +action.payload.toFixed(2) } as IInvoice
      };
    case INVOICE_TYPES.FETCH_INVOICE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
