import { createProductEpic } from '../nested-states/create/epics';
import { updateProductEpic } from '../nested-states/update/epics';
import { deleteProductEpic } from '../nested-states/delete/epics';
import { fetchProductsEpic } from '../nested-states/fetch/epics';
import { fetchProductByIdEpic } from '../nested-states/fetchById/epics';

export default [
  createProductEpic,
  updateProductEpic,
  deleteProductEpic,
  fetchProductsEpic,
  fetchProductByIdEpic
];
