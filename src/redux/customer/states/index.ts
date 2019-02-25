import TState from "../../../shared/typing/state";
import ICustomer from "../../../shared/models/Customer";

export type State = TState & {
    readonly customer: ICustomer | null;
    customers: ReadonlyArray<ICustomer>;
};

export const initialState: State = {
    loading: false,
    error: null,
    customer: null,
    customers: []
};