import IInvoice from "../../../shared/models/Invoice";
import TState from "../../../shared/typing/state";

export type State = TState & {
    readonly invoice: IInvoice | null;
    invoices: ReadonlyArray<IInvoice>;
};

export const initialState: State = {
    loading: false,
    error: null,
    invoice: null,
    invoices: []
};