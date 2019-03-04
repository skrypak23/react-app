import { ActionType } from 'typesafe-actions';
import * as InvoiceActions from '../actions';
import * as INVOICE_TYPES from '../actions/types';
import { State, initialState } from '../states';
import IInvoice from '../../../shared/models/Invoice';
import { union, deleteData } from '../../../shared/utils';

type Action = ActionType<typeof InvoiceActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_TYPES.SET_INVOICE_DATA: {
      const entities = union<IInvoice>(action.payload, state.entities);
      return {
        ...state,
        entities
      };
    }
    case INVOICE_TYPES.DELETE_INVOICE_DATA: {
      const entities = deleteData<IInvoice>(action.payload, state.entities);
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
