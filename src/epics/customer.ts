import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType, Epic } from 'redux-observable';
import TAction from '../common/types/TAction';
import TYPES from '../types';
import * as API from '../api/customer';
import Actions from '../actions';
import ICustomer from '../models/Customer';

const { Customer } = Actions;

export const getCustomersEpic: Epic<TAction, any> = action$ =>
  action$.pipe(
    ofType(TYPES.CUSTOMER.GET_CUSTOMERS_REQUEST),
    switchMap(() =>
      ajax.getJSON(API.GET_CUSTOMERS).pipe(
        map((data: any) => Customer.fetchCustomersSuccess(data)),
        catchError(err => of(Customer.setError(err.message)))
      )
    )
  );
