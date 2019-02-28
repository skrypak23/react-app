import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import InvoiceService from '../../../../../../../shared/services/invoice.service';
import { FetchInvoiceActions, FetchInvoicesTypes } from '../actions';

type RootAction = ActionType<typeof FetchInvoiceActions>;

export const fetchInvoicesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(FetchInvoicesTypes.FETCH_INVOICES_REQUEST)),
    switchMap(action =>
      InvoiceService.fetchInvoices(action.payload).pipe(
        map(response => FetchInvoiceActions.fetchInvoicesSuccess(response)),
        catchError(err => of(FetchInvoiceActions.fetchInvoicesFailure(err)))
      )
    )
  );
