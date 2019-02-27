import { State, initialState } from '../states';
import { RootAction } from '../../store/types';
import * as CUSTOMER_TYPES from '../../customer/actions/types';
import * as PRODUCT_TYPES from '../../product/actions/types';
import * as INVOICE_TYPES from '../../invoice/actions/types';
import * as INVOICE_ITEMS_TYPES from '../../invoice-item/actions/types';

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST:
    case CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST:
    case CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST:
    case CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST:
    case PRODUCT_TYPES.GET_PRODUCTS_REQUEST:
    case PRODUCT_TYPES.CREATE_PRODUCT_REQUEST:
    case PRODUCT_TYPES.DELETE_PRODUCT_REQUEST:
    case PRODUCT_TYPES.GET_PRODUCT_BY_ID_REQUEST:
    case INVOICE_TYPES.GET_INVOICES_REQUEST:
    case INVOICE_TYPES.CREATE_INVOICE_REQUEST:
    case INVOICE_TYPES.EDIT_INVOICE_REQUEST:
    case INVOICE_TYPES.DELETE_INVOICE_REQUEST:
    case INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST:
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_REQUEST:
    case INVOICE_ITEMS_TYPES.CREATE_INVOICE_ITEMS_REQUEST:
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_REQUEST:
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case INVOICE_ITEMS_TYPES.FETCH_INVOICE_ITEMS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return initialState;
  }
};

export default reducer;
