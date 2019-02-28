import IProduct from '../../../../../../../shared/models/Product';

export type State = {
  loading: boolean;
  error: Error | null;
  data: ReadonlyArray<IProduct>;
};

export const initialState: State = {
  loading: false,
  error: null,
  data: []
};
