import IInvoiceItem from '../../../shared/models/InvoiceItem';

type TEdit = { [index: number]: IInvoiceItem };

export type State = {
  entities: ReadonlyArray<IInvoiceItem>;
  edited: TEdit;
};

export const initialState: State = {
  entities: [],
  edited: {}
};
