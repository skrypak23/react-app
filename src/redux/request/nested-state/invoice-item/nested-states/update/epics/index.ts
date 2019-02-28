import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { UpdateInvoiceItemTypes, UpdateInvoiceItemActions } from '../actions';
import { RootState } from '../../../../../../store/types';
import InvoiceItemService from '../../../../../../../shared/services/invoice-item.service';

type RootAction = ActionType<typeof UpdateInvoiceItemActions>;

export const updateInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(UpdateInvoiceItemTypes.UPDATE_INVOICE_ITEM_REQUEST)),
    switchMap(action =>
      InvoiceItemService.editInvoiceItem(action.payload).pipe(
        map(response => UpdateInvoiceItemActions.editInvoiceItemSuccess(response)),
        catchError(err => of(UpdateInvoiceItemActions.editInvoiceItemFailure(err)))
      )
    )
  );
