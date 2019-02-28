import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import CustomerService from '../../../../../../../shared/services/customer.service';
import { FetchCustomerByIdTypes, FetchCustomerByIdActions } from '../actions';

type RootAction = ActionType<typeof FetchCustomerByIdActions>;

export const fetchCustomerByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(FetchCustomerByIdTypes.FETCH_CUSTOMERS_BY_ID_REQUEST)),
    switchMap(action =>
      CustomerService.fetchCustomerById(action.payload).pipe(
        map(response => FetchCustomerByIdActions.fetchCustomerByIdSuccess(response)),
        catchError(err => of(FetchCustomerByIdActions.fetchCustomerByIdFailure(err)))
      )
    )
  );
