import IInvoice from '../../../shared/models/Invoice';

export type State = {
  entities: ReadonlyArray<IInvoice>;
};

export const initialState: State = {
  entities: []
};
