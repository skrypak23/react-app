import TState from "../../../shared/typing/state";
import IInvoiceItem from "../../../shared/models/InvoiceItem";

export type State = TState & {
    readonly invoiceItem: IInvoiceItem | null;
    invoiceItems: ReadonlyArray<IInvoiceItem>;
};

export const initialState: State = {
    loading: false,
    error: null,
    invoiceItem: null,
    invoiceItems: []
};