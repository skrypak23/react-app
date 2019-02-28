import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import InvoiceService from '../../../../../../../shared/services/invoice.service';
import { FetchInvoiceByIdTypes, FetchInvoiceByIdActions } from '../actions';

type RootAction = ActionType<typeof FetchInvoiceByIdActions>;

export const fetchInvoiceByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(FetchInvoiceByIdTypes.FETCH_INVOICE_BY_ID_REQUEST)),
    switchMap(action =>
      InvoiceService.fetchInvoiceById(action.payload).pipe(
        map(response => FetchInvoiceByIdActions.fetchInvoiceByIdSuccess(response)),
        catchError(err => of(FetchInvoiceByIdActions.fetchInvoiceByIdFailure(err)))
      )
    )
  );
