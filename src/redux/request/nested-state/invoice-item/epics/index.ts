import {
  createInvoiceItemEpic,
  createInvoiceItemsEpic
} from '../nested-states/create/epics';
import { updateInvoiceItemEpic } from '../nested-states/update/epics';
import {
  deleteInvoiceItemEpic,
  deleteInvoiceItemsEpic,
  deleteInvoiceItemsRequestEpic
} from '../nested-states/delete/epics';
import { fetchInvoiceItemsEpic } from '../nested-states/fetch/epics';
import { fetchInvoiceItemByIdEpic } from '../nested-states/fetchById/epics';

export default [
  createInvoiceItemEpic,
  updateInvoiceItemEpic,
  deleteInvoiceItemEpic,
  fetchInvoiceItemsEpic,
  fetchInvoiceItemByIdEpic,
  createInvoiceItemsEpic,
  deleteInvoiceItemsEpic,
  deleteInvoiceItemsRequestEpic
];
