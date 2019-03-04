import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import InvoiceItemService from '../../../../../../../shared/services/invoice-item.service';
import { FetchInvoiceItemByIdTypes, FetchInvoiceItemByIdActions } from '../actions';

type RootAction = ActionType<typeof FetchInvoiceItemByIdActions>;

export const fetchInvoiceItemByIdEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isOfType(FetchInvoiceItemByIdTypes.FETCH_INVOICE_ITEM_BY_ID_REQUEST)),
    switchMap(action =>
      InvoiceItemService.fetchInvoiceItemById(action.payload).pipe(
        map(response =>
          FetchInvoiceItemByIdActions.fetchInvoiceItemByIdSuccess(response)
        ),
        catchError(err =>
          of(FetchInvoiceItemByIdActions.fetchInvoiceItemByIdFailure(err))
        )
      )
    )
  );
