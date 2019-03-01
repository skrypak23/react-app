import {
  CreateInvoiceActions,
  CreateInvoiceTypes
} from '../nested-states/create/actions';
import {
  UpdateInvoiceActions,
  UpdateInvoiceTypes
} from '../nested-states/update/actions';
import {
  DeleteInvoiceActions,
  DeleteInvoiceTypes
} from '../nested-states/delete/actions';
import { FetchInvoiceActions, FetchInvoicesTypes } from '../nested-states/fetch/actions';
import {
  FetchInvoiceByIdActions,
  FetchInvoiceByIdTypes
} from '../nested-states/fetchById/actions';

export const Action = {
  ...CreateInvoiceActions,
  ...UpdateInvoiceActions,
  ...DeleteInvoiceActions,
  ...FetchInvoiceByIdActions,
  ...FetchInvoiceActions
};

export const Types = {
  ...CreateInvoiceTypes,
  ...UpdateInvoiceTypes,
  ...DeleteInvoiceTypes,
  ...FetchInvoiceByIdTypes,
  ...FetchInvoicesTypes
};
