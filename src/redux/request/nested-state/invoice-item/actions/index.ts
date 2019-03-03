import {
  CreateInvoiceItemActions,
  CreateInvoiceItemTypes
} from '../nested-states/create/actions';
import {
  UpdateInvoiceItemActions,
  UpdateInvoiceItemTypes
} from '../nested-states/update/actions';
import {
  DeleteInvoiceItemActions,
  DeleteInvoiceItemTypes
} from '../nested-states/delete/actions';
import {
  FetchInvoiceItemActions,
  FetchInvoiceItemsTypes
} from '../nested-states/fetch/actions';
import {
  FetchInvoiceItemByIdActions,
  FetchInvoiceItemByIdTypes
} from '../nested-states/fetchById/actions';

export const Action = {
  ...CreateInvoiceItemActions,
  ...UpdateInvoiceItemActions,
  ...DeleteInvoiceItemActions,
  ...FetchInvoiceItemActions,
  ...FetchInvoiceItemByIdActions
};

export const Types = {
  ...CreateInvoiceItemTypes,
  ...UpdateInvoiceItemTypes,
  ...DeleteInvoiceItemTypes,
  ...FetchInvoiceItemsTypes,
  ...FetchInvoiceItemByIdTypes
};
