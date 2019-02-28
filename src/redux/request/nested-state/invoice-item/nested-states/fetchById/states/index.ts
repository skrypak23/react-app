import IInvoiceItem from '../../../../../../../shared/models/InvoiceItem';

export type State = {
  loading: boolean;
  error: Error | null;
  readonly data: IInvoiceItem | null;
};

export const initialState: State = {
  loading: false,
  error: null,
  data: null
};
