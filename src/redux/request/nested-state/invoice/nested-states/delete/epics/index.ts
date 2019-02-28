import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../../../../../store/types';
import InvoiceService from '../../../../../../../shared/services/invoice.service';
import { DeleteInvoiceTypes, DeleteInvoiceActions } from '../actions';

type RootAction = ActionType<typeof DeleteInvoiceActions>;

export const deleteInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(DeleteInvoiceTypes.DELETE_INVOICE_REQUEST)),
    switchMap(action =>
      InvoiceService.deleteInvoice(action.payload).pipe(
        map(response => DeleteInvoiceActions.deleteInvoiceSuccess(response)),
        catchError(err => of(DeleteInvoiceActions.deleteInvoiceFailure(err)))
      )
    )
  );
