import { ActionType } from 'typesafe-actions';
import * as InvoiceActions from '../actions';
import * as INVOICE_TYPES from '../actions/types';
import { State, initialState } from '../states';
import IInvoice from "../../../shared/models/Invoice";

type Action = ActionType<typeof InvoiceActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_TYPES.GET_INVOICES_REQUEST:
    case INVOICE_TYPES.CREATE_INVOICE_REQUEST:
    case INVOICE_TYPES.EDIT_INVOICE_REQUEST:
    case INVOICE_TYPES.DELETE_INVOICE_REQUEST:
    case INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case INVOICE_TYPES.GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        loading: false,
        error: null
      };
    case INVOICE_TYPES.CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
        loading: false,
        error: null
      };
    case INVOICE_TYPES.GET_INVOICE_BY_ID_SUCCESS:
      return {
        ...state,
        invoice: action.payload,
        loading: false,
        error: null
      };
    case INVOICE_TYPES.EDIT_INVOICE_SUCCESS:
      const updatedInvoices = state.invoices.map(invoice => {
        if (invoice.id === action.payload.id) return action.payload;
        return invoice;
      });
      return {
        ...state,
        invoice: action.payload,
        invoices: updatedInvoices,
        loading: false,
        error: null
      };
    case INVOICE_TYPES.DELETE_INVOICE_SUCCESS:
      const filteredInvoices = state.invoices.filter(
        invoice => invoice.id !== action.payload.id
      );
      return { ...state, invoices: filteredInvoices };
    case INVOICE_TYPES.RESET_INVOICE:
      return { ...state, invoice: null, loading: false, error: null };
    case INVOICE_TYPES.FILL_INVOICE:
      return {
        ...state,
        invoice: { ...state.invoice, ...action.payload },
        loading: false,
        error: null
      };
    case INVOICE_TYPES.CALCULATE_TOTAL:
      return { ...state, invoice: { ...state.invoice, total: action.payload } as IInvoice };
    case INVOICE_TYPES.FETCH_INVOICE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
