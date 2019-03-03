import { ActionType } from 'typesafe-actions';
import * as InvoiceItemActions from '../actions';
import * as INVOICE_ITEMS_TYPES from '../actions/types';
import { State, initialState } from '../states';
import { eqBy, propEq, reject, unionWith, prop, remove } from 'ramda';
import IInvoiceItem from '../../../shared/models/InvoiceItem';

type Action = ActionType<typeof InvoiceItemActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_ITEMS_TYPES.SET_INVOICE_ITEM_DATA:
      const entities = unionWith<IInvoiceItem>(
        eqBy(prop('id')),
        action.payload,
        state.entities
      );
      return {
        ...state,
        entities
      };
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEM: {
      const entities = reject<IInvoiceItem>(
        propEq('id', action.payload.id),
        state.entities
      );
      return {
        ...state,
        entities
      };
    }

    // case INVOICE_ITEMS_TYPES.FILL_INVOICE_ITEMS:
    //   const foundItem = state.invoiceItems[action.payload];
    //   return {
    //     ...state,
    //     invoiceItem: foundItem
    //   };

    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL: {
      const entities = remove(action.payload, 1, state.entities);
      return { ...state, entities };
    }

    case INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_LOCAL: {
      const entities = [...state.entities];
      entities[action.payload.id] = action.payload.invoiceItem;
      return {
        ...state,
        entities
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
