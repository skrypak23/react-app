import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../../../../../store/types';
import CustomerService from '../../../../../../../shared/services/customer.service';
import { UpdateCustomerTypes, UpdateCustomerActions } from '../actions';

type RootAction = ActionType<typeof UpdateCustomerActions>;

export const updateCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(UpdateCustomerTypes.UPDATE_CUSTOMER_REQUEST)),
    switchMap(action =>
      CustomerService.editCustomer(action.payload).pipe(
        map(response => UpdateCustomerActions.editCustomerSuccess(response)),
        catchError(err => of(UpdateCustomerActions.editCustomerFailure(err)))
      )
    )
  );
