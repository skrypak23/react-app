import IProduct from '../../../shared/models/Product';

export type State = {
  entities: ReadonlyArray<IProduct>;
};

export const initialState: State = {
  entities: []
};
