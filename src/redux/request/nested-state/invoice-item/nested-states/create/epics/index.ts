import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../../../../../store/types';
import InvoiceItemService from '../../../../../../../shared/services/invoice-item.service';
import { CreateInvoiceItemTypes, CreateInvoiceItemActions } from '../actions';
import { InvoiceRequest } from '../../../../../actions';
import { createItems } from '../../../../../../../shared/epics';

export const createInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CreateInvoiceItemTypes.CREATE_INVOICE_ITEM_REQUEST)),
    switchMap(action =>
      InvoiceItemService.createInvoiceItem(action.payload).pipe(
        map(response => CreateInvoiceItemActions.createInvoiceItemSuccess(response)),
        catchError(err => of(CreateInvoiceItemActions.createInvoiceItemFailure(err)))
      )
    )
  );

export const createInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(InvoiceRequest.Types.CREATE_INVOICE_SUCCESS)),
    switchMap(action => createItems(state$, action.payload.id))
  );
