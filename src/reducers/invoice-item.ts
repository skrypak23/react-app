import { ActionType } from "typesafe-actions";
import { InvoiceItemActions } from "../actions";
import { INVOICE_ITEMS_TYPES } from "../types";
import IInvoiceItem from "../shared/models/InvoiceItem";
import TState from "../common/types/TState";

export type State = TState & {
  readonly invoiceItem: IInvoiceItem | null;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
};
type Action = ActionType<typeof InvoiceItemActions>;

const initialState: State = {
  loading: false,
  error: null,
  invoiceItem: null,
  invoiceItems: []
};

const reducer = (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case INVOICE_ITEMS_TYPES.FILL_INVOICE_ITEMS:
      return {
        ...state,
        invoiceItems: [...state.invoiceItems, payload as IInvoiceItem],
        loading: false,
        error: null
      };
    case INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_SUCCESS:
      return {
        ...state,
        invoiceItems: [...state.invoiceItems, ...(payload as IInvoiceItem[])]
      };
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL:
      const filteredItems = state.invoiceItems.filter(
        (_, i: number) => i !== payload
      );
      return { ...state, invoiceItems: filteredItems };
    case INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_SUCCESS:
      const itemsWithoutDeleted = state.invoiceItems.filter(
        iI => iI.id !== (payload as IInvoiceItem).id
      );
      return { ...state, invoiceItems: itemsWithoutDeleted };
    default:
      return state;
  }
};

export default reducer;
