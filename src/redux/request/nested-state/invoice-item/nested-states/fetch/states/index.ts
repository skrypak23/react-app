import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';

export type State = {
  loading: boolean;
  error: Error | null;
  data: ReadonlyArray<IInvoiceItem>;
};

export const initialState: State = {
  loading: false,
  error: null,
  data: []
};
