import IProduct from '../../../../../../../shared/models/Product';

export type State = {
  loading: boolean;
  error: Error | null;
  readonly data: IProduct | null;
};

export const initialState: State = {
  loading: false,
  error: null,
  data: null
};
