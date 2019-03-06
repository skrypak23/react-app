import ICustomer from "../../../shared/models/Customer";

export type State = {
    entities: ReadonlyArray<ICustomer>;
};

export const initialState: State = {
    entities: []
};