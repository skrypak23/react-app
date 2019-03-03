import { ActionType } from 'typesafe-actions';
import * as InvoiceActions from '../actions';
import * as INVOICE_TYPES from '../actions/types';
import { State, initialState } from '../states';
import { eqBy, propEq, reject, unionWith, prop } from 'ramda';
import IInvoice from '../../../shared/models/Invoice';

type Action = ActionType<typeof InvoiceActions>;

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case INVOICE_TYPES.SET_INVOICE_DATA: {
      const entities = unionWith<IInvoice>(
        eqBy(prop('id')),
        action.payload,
        state.entities
      );
      return {
        ...state,
        entities
      };
    }
    case INVOICE_TYPES.DELETE_INVOICE: {
      const entities = reject<IInvoice>(propEq('id', action.payload.id), state.entities);
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
