import { of, from } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../../../../../store/types';
import InvoiceItemService from '../../../../../../../shared/services/invoice-item.service';
import { DeleteInvoiceItemTypes, DeleteInvoiceItemActions } from '../actions';
import { FetchInvoiceItemActions } from '../../fetch/actions';
import { DeleteInvoiceTypes } from '../../../../invoice/nested-states/delete/actions';

export const deleteInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(DeleteInvoiceItemTypes.DELETE_INVOICE_ITEM_REQUEST)),
    switchMap(action =>
      InvoiceItemService.deleteInvoiceItem(action.payload).pipe(
        map(response => DeleteInvoiceItemActions.deleteInvoiceItemSuccess(response)),
        catchError(err => of(DeleteInvoiceItemActions.deleteInvoiceItemFailure(err)))
      )
    )
  );

export const deleteInvoiceItemsRequestEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isOfType(DeleteInvoiceTypes.DELETE_INVOICE_REQUEST)),
    map(action => FetchInvoiceItemActions.fetchAllInvoiceItemsRequest(action.payload.id))
  );

export const deleteInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(DeleteInvoiceTypes.DELETE_INVOICE_SUCCESS)),
    switchMap(() =>
      from(state$.value.request.invoiceItem.fetch.data).pipe(
        map(data =>
          DeleteInvoiceItemActions.deleteInvoiceItemRequest(data.id, data.invoice_id)
        )
      )
    )
  );
