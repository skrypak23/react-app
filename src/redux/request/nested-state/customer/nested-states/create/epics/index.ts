import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import CustomerService from '../../../../../../../shared/services/customer.service';
import { CreateCustomerTypes, CreateCustomerActions } from '../actions';

type RootAction = ActionType<typeof CreateCustomerActions>;

export const createCustomersEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
  action$.pipe(
    filter(isOfType(CreateCustomerTypes.CREATE_CUSTOMER_REQUEST)),
    switchMap(action =>
      CustomerService.createCustomer(action.payload).pipe(
        map(response => CreateCustomerActions.createCustomerSuccess(response)),
        catchError(err => of(CreateCustomerActions.createCustomerFailure(err)))
      )
    )
  );
