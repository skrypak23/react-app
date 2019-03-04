import { of, concat } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../../../../../store/types';
import InvoiceService from '../../../../../../../shared/services/invoice.service';
import { CreateInvoiceTypes, CreateInvoiceActions } from '../actions';
import { createItems } from '../../../../../../../shared/epics';
import { InvoiceItemRequest } from '../../../../../actions';

const Actions = {
  ...CreateInvoiceActions,
  ...InvoiceItemRequest.Action
};

type RootAction = ActionType<typeof Actions>;

export const createInvoiceEpic: Epic<RootAction, RootAction, RootState> = (
  action$
) =>
  action$.pipe(
    filter(isOfType(CreateInvoiceTypes.CREATE_INVOICE_REQUEST)),
    switchMap(action =>
      InvoiceService.createInvoice(action.payload).pipe(
        map(response => CreateInvoiceActions.createInvoiceSuccess(response)),
        catchError(err => of(CreateInvoiceActions.createInvoiceFailure(err)))
      )
    )
  );
