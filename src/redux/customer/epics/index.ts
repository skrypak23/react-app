import { filter, map, mapTo } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../store/types';
import * as CustomerActions from '../actions';
import * as CUSTOMER_TYPES from '../actions/types';
import { CustomerRequest as Request } from '../../request/actions';

const { Action, Types } = Request;

const setCustomerDataEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        Types.CREATE_CUSTOMER_SUCCESS,
        Types.UPDATE_CUSTOMER_SUCCESS,
        Types.FETCH_CUSTOMERS_SUCCESS,
        Types.DELETE_CUSTOMER_SUCCESS
      ])
    ),
    map(action => {
      if (action.type === Types.DELETE_CUSTOMER_SUCCESS) {
        return CustomerActions.deleteActionData(action.payload);
      } else {
        if (Array.isArray(action.payload)) {
          return CustomerActions.setCustomerData(action.payload);
        }
        return CustomerActions.setCustomerData([action.payload]);
      }
    })
  );

const createCustomerEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.CREATE_CUSTOMER)),
    map(action => Action.createCustomerRequest(action.payload))
  );

const editCustomerEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.EDIT_CUSTOMER)),
    map(action => Action.editCustomerRequest(action.payload.id, action.payload.customer))
  );

const deleteCustomerEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.DELETE_CUSTOMER)),
    map(action => Action.deleteCustomerRequest(action.payload))
  );

const fetchCustomerEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.FETCH_CUSTOMERS)),
    map(() => Action.fetchAllCustomersRequest())
  );

const fetchCustomerByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.FETCH_CUSTOMER)),
    map(action => Action.fetchCustomerByIdRequest(action.payload))
  );

const resetCustomerEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.RESET_CUSTOMER)),
    mapTo(Action.resetCustomer())
  );

export default [
  setCustomerDataEpic,
  createCustomerEpic,
  fetchCustomerByIdEpic,
  fetchCustomerEpic,
  editCustomerEpic,
  deleteCustomerEpic,
  resetCustomerEpic
];
