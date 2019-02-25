import { of, Observable, concat } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { RootAction, RootState } from '../../store/types';
import * as CUSTOMER_TYPES from '../actions/types';
import ICustomer from '../../../shared/models/Customer';
import * as CustomerActions from '../actions';
import { isOfType } from 'typesafe-actions';
import { Action } from 'redux';
import ApiService from '../../../shared/services/request.service';

const fetchCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST)),
    switchMap(action =>
      ApiService.fetchAllData<ICustomer>(CustomerActions, action.payload)
    )
  );

const fetchCustomersByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST)),
    switchMap(action => ApiService.fetchById<ICustomer>(CustomerActions, action.payload))
  );

const editCustomerEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST)),
    switchMap(action => ApiService.editData<ICustomer>(CustomerActions, action.payload))
  );

const deleteCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CUSTOMER_TYPES.DELETE_CUSTOMER_REQUEST)),
    switchMap(action =>
      concat(
        ApiService.deleteData<ICustomer>(CustomerActions, action.payload),
        of(CustomerActions.fetchAllCustomers())
      )
    )
  );

const createCustomersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST),
    switchMap((action: any) =>
      ApiService.createData<ICustomer>(CustomerActions, action.payload)
    )
  );

export default [
  fetchCustomersByIdEpic,
  fetchCustomersEpic,
  editCustomerEpic,
  deleteCustomersEpic,
  createCustomersEpic
];
