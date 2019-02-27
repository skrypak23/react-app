import { Observable } from 'rxjs';
import { switchMap, filter, mergeMap } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { RootAction, RootState } from '../../store/types';
import * as INVOICE_ITEM_TYPES from '../actions/types';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import * as InvoiceItemActions from '../actions';
import { isOfType } from 'typesafe-actions';
import { Action } from 'redux';
import ApiService from '../../../shared/services/request.service';
import * as INVOICE_TYPES from '../../invoice/actions/types';
import { createItems } from '../../../shared/utils';

const fetchInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.GET_INVOICE_ITEMS_REQUEST)),
    switchMap((action: any) =>
      ApiService.fetchAllData<IInvoiceItem>(InvoiceItemActions, action.payload)
    )
  );

const fetchInvoiceItemsByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST)),
    switchMap((action: any) =>
      ApiService.fetchById<IInvoiceItem>(InvoiceItemActions, action.payload)
    )
  );

const editInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.EDIT_INVOICE_ITEMS_REQUEST)),
    switchMap((action: any) =>
      ApiService.editData<IInvoiceItem>(InvoiceItemActions, action.payload)
    )
  );
const deleteInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.DELETE_INVOICE_ITEMS_REQUEST)),
    switchMap((action: any) =>
      ApiService.deleteData<IInvoiceItem>(InvoiceItemActions, action.payload)
    )
  );

const createInvoiceItemsReqEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(INVOICE_ITEM_TYPES.CREATE_INVOICE_ITEMS_REQUEST),
    switchMap((action: any) =>
      ApiService.createData<IInvoiceItem>(InvoiceItemActions, action.payload)
    )
  );

const createInvoiceItemEpic = (action$: Observable<any>, state$: StateObservable<any>) =>
  action$.pipe(
    ofType(INVOICE_TYPES.CREATE_INVOICE_SUCCESS),
    mergeMap((action: any) => createItems(state$, action))
  );

export default [
  fetchInvoiceItemsByIdEpic,
  fetchInvoiceItemsEpic,
  editInvoiceItemEpic,
  createInvoiceItemsReqEpic,
  createInvoiceItemEpic,
  deleteInvoiceItemEpic
];
