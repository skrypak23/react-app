import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import CustomerService from '../../../../../../../shared/services/customer.service';
import { DeleteCustomerTypes, DeleteCustomerActions } from '../actions';

type RootAction = ActionType<typeof DeleteCustomerActions>;

export const deleteCustomersEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(DeleteCustomerTypes.DELETE_CUSTOMER_REQUEST)),
    switchMap(action =>
      CustomerService.deleteCustomer(action.payload).pipe(
        map(response => DeleteCustomerActions.deleteCustomerSuccess(response)),
        catchError(err => of(DeleteCustomerActions.deleteCustomerFailure(err)))
      )
    )
  );
