import ICustomer from "../../../shared/models/Customer";

export type State = {
    success: null | boolean;
    entities: ReadonlyArray<ICustomer>;
};

export const initialState: State = {
    success: null,
    entities: []
};