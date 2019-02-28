import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import CustomerService from '../../../../../../../shared/services/customer.service';
import { FetchCustomerActions, FetchCustomersTypes } from '../actions';

type RootAction = ActionType<typeof FetchCustomerActions>;

export const fetchCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(FetchCustomersTypes.FETCH_CUSTOMERS_REQUEST)),
    switchMap(action =>
      CustomerService.fetchCustomers(action.payload).pipe(
        map(response => FetchCustomerActions.fetchCustomersSuccess(response)),
        catchError(err => of(FetchCustomerActions.fetchCustomersFailure(err)))
      )
    )
  );
