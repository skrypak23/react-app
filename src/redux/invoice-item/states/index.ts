import IInvoiceItem from '../../../shared/models/InvoiceItem';

export type State = {
  entities: ReadonlyArray<IInvoiceItem>;
};

export const initialState: State = {
  entities: []
};
