import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../../../../../store/types';
import InvoiceService from '../../../../../../../shared/services/invoice.service';
import { CreateInvoiceTypes, CreateInvoiceActions } from '../actions';

type RootAction = ActionType<typeof CreateInvoiceActions>;

export const createInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CreateInvoiceTypes.CREATE_INVOICE_REQUEST)),
    switchMap(action =>
      InvoiceService.createInvoice(action.payload).pipe(
        map(response => CreateInvoiceActions.createInvoiceSuccess(response)),
        catchError(err => of(CreateInvoiceActions.createInvoiceFailure(err)))
      )
    )
  );
