import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { RootAction, RootState } from '../store/types';
import { CUSTOMER_TYPES } from '../types';
import API from '../api';
import { CustomerActions } from '../actions';
import ICustomer from '../models/Customer';

export const getCustomersEpi: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    ofType(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST),
    switchMap(() =>
      from(API.Customer.fetchAll()).pipe(
        map((data: ICustomer[]) => CustomerActions.fetchCustomersSuccess(data)),
        catchError(err => of(CustomerActions.setError(err.message)))
      )
    )
  );
