import {
  createInvoiceEpic,
  createInvoiceSuccessEpic
} from '../nested-states/create/epics';
import { updateInvoiceEpic } from '../nested-states/update/epics';
import {
  deleteInvoiceEpic,
  deleteInvoiceSuccessEpic
} from '../nested-states/delete/epics';
import { fetchInvoicesEpic } from '../nested-states/fetch/epics';
import { fetchInvoiceByIdEpic } from '../nested-states/fetchById/epics';

export default [
  createInvoiceEpic,
  updateInvoiceEpic,
  deleteInvoiceEpic,
  fetchInvoicesEpic,
  fetchInvoiceByIdEpic,
  createInvoiceSuccessEpic,
  deleteInvoiceSuccessEpic
];
