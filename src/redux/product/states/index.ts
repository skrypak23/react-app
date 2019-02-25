import TState from "../../../shared/typing/state";
import IProduct from "../../../shared/models/Product";

export type State = TState & {
    readonly product: IProduct | null;
    products: ReadonlyArray<IProduct>;
};

export const initialState: State = {
    loading: false,
    error: null,
    product: null,
    products: []
};