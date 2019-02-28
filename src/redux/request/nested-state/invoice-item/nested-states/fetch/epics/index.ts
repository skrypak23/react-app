import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import InvoiceItemService from '../../../../../../../shared/services/invoice-item.service';
import { FetchInvoiceItemActions, FetchInvoiceItemsTypes } from '../actions';

type RootAction = ActionType<typeof FetchInvoiceItemActions>;

export const fetchInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(FetchInvoiceItemsTypes.FETCH_INVOICE_ITEMS_REQUEST)),
    switchMap(action =>
      InvoiceItemService.fetchInvoiceItems(action.payload).pipe(
        map(response => FetchInvoiceItemActions.fetchInvoiceItemsSuccess(response)),
        catchError(err => of(FetchInvoiceItemActions.fetchInvoiceItemsFailure(err)))
      )
    )
  );
