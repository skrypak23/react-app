import { ActionType } from 'typesafe-actions';
import * as InvoiceItemActions from '../actions';
import * as INVOICE_ITEMS_TYPES from '../actions/types';
import { State, initialState } from '../states';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import { union } from '../../../shared/utils';

type Action = ActionType<typeof InvoiceItemActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_ITEMS_TYPES.SET_INVOICE_ITEM_DATA:
      const entities = union<IInvoiceItem>(action.payload, state.entities);
      return {
        ...state,
        entities
      };

    case INVOICE_ITEMS_TYPES.RESET_INVOICE_ITEMS:
      return {
        ...state,
        entities: []
      };

    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEM_LOCAL: {
      const entities = state.entities.filter((_, idx) => idx !== action.payload);
      return { ...state, entities };
    }

    case INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEM_LOCAL: {
      const { index, invoiceItem } = action.payload;
      const entities = [...state.entities];
      const edited = { ...state.edited, [index]: invoiceItem };
      entities[action.payload.index] = action.payload.invoiceItem;
      return {
        ...state,
        entities,
        edited
      };
    }
    case INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM: {
      const entities = [...state.entities, action.payload];
      return {
        ...state,
        entities
      };
    }
    default:
      return state;
  }
};

export default reducer;
