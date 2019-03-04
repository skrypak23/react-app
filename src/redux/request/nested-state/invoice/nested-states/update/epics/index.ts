import { of, concat } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { UpdateInvoiceTypes, UpdateInvoiceActions } from '../actions';
import { InvoiceItemRequest } from '../../../../../actions';
import { RootState } from '../../../../../../store/types';
import InvoiceService from '../../../../../../../shared/services/invoice.service';
import { editItems, deleteItems, createItems } from '../../../../../../../shared/epics';

const Actions = {
  ...UpdateInvoiceActions,
  ...InvoiceItemRequest.Action
};

type RootAction = ActionType<typeof Actions>;

export const updateInvoiceEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(UpdateInvoiceTypes.UPDATE_INVOICE_REQUEST)),
    switchMap(action =>
      concat(
        InvoiceService.editInvoice(action.payload).pipe(
          map(response => UpdateInvoiceActions.editInvoiceSuccess(response)),
          switchMap(action =>
            concat(
              editItems(state$, action.payload.id),
              deleteItems(state$, action.payload.id),
              createItems(state$, action.payload.id),
            )
          ),
          catchError(err => of(UpdateInvoiceActions.editInvoiceFailure(err)))
        ),
        of(UpdateInvoiceActions.editInvoiceSuccess(action.payload.body))
      )
    )
  );
