import IInvoice from '../../../../../../../shared/models/Invoice';

export type State = {
  loading: boolean;
  error: Error | null;
  readonly data: IInvoice | null;
};

export const initialState: State = {
  loading: false,
  error: null,
  data: null
};
