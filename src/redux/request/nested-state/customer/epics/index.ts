import { createCustomersEpic } from '../nested-states/create/epics';
import { updateCustomersEpic } from '../nested-states/update/epics';
import { deleteCustomersEpic } from '../nested-states/delete/epics';
import { fetchCustomersEpic } from '../nested-states/fetch/epics';
import { fetchCustomerByIdEpic } from '../nested-states/fetchById/epics';

export default [
  createCustomersEpic,
  updateCustomersEpic,
  deleteCustomersEpic,
  fetchCustomersEpic,
  fetchCustomerByIdEpic
];
