import ICustomer from '../../../../../../../shared/models/Customer';

export type State = {
  loading: boolean;
  error: Error | null;
  data: ReadonlyArray<ICustomer>;
};

export const initialState: State = {
  loading: false,
  error: null,
  data: []
};
