import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../../../../../store/types';
import InvoiceItemService from '../../../../../../../shared/services/invoice-item.service';
import { DeleteInvoiceItemTypes, DeleteInvoiceItemActions } from '../actions';
import { DeleteInvoiceTypes } from '../../../../invoice/nested-states/delete/actions';
import { deleteItems } from '../../../../../../../shared/epics';

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

export const deleteInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(DeleteInvoiceTypes.DELETE_INVOICE_SUCCESS)),
    switchMap(action => deleteItems(state$, action.payload.id))
  );
