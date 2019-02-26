import { Observable, from, of, concat } from 'rxjs';
import { Action } from 'redux';
import { isOfType } from 'typesafe-actions';
import { switchMap, filter, mergeMap, map, tap, mapTo } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { RootAction, RootState } from '../../store/types';
import * as INVOICE_TYPES from '../actions/types';
import * as INVOICE_ITEMS_TYPES from '../../invoice-item/actions/types';
import * as InvoiceActions from '../actions';
import * as InvoiceItemActions from '../../invoice-item/actions';
import IInvoice from '../../../shared/models/Invoice';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import ApiService from '../../../shared/services/request.service';
import calculateTotal from '../../../shared/calculateTotal';

const fetchInvoicesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.GET_INVOICES_REQUEST)),
    switchMap((action: any) =>
      ApiService.fetchAllData<IInvoice>(InvoiceActions, action.payload)
    )
  );
const fetchInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.GET_INVOICE_BY_ID_REQUEST)),
    switchMap((action: any) =>
      ApiService.fetchById<IInvoice>(InvoiceActions, action.payload)
    )
  );
const editInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.EDIT_INVOICE_REQUEST)),
    switchMap((action: any) =>
      ApiService.editData<IInvoice>(InvoiceActions, action.payload)
    )
  );

const deleteInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.DELETE_INVOICE_REQUEST)),
    switchMap((action: any) =>
      ApiService.deleteData<IInvoice>(InvoiceActions, action.payload)
    )
  );
const calculateTotalEpic = (
  action$: Observable<RootAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    filter(
      isOfType([
        INVOICE_TYPES.FILL_INVOICE,
        INVOICE_ITEMS_TYPES.ADD_INVOICE_ITEM,
        INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_SUCCESS,
        INVOICE_ITEMS_TYPES.DELETE_INVOICE_ITEMS_LOCAL,
        INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_SUCCESS,
        INVOICE_ITEMS_TYPES.EDIT_INVOICE_ITEMS_LOCAL_REQUEST
      ])
    ),
    map(() => {
      const { invoice, invoiceItem, product } = state$.value;
      const discount =
        invoice.invoice && invoice.invoice.discount
          ? invoice.invoice.discount
          : 0;
      return calculateTotal(
        discount,
        invoiceItem.invoiceItems,
        product.products
      );
    }),
    map((total: number) => InvoiceActions.calculateTotal(total))
  );

const createInvoicesEpic = (
  action$: Observable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(INVOICE_TYPES.CREATE_INVOICE_REQUEST),
    switchMap((action: any) =>
    concat(
      ApiService.createData<IInvoice>(InvoiceActions, action.payload).pipe(
        switchMap(action =>
          concat(
          from(state$.value.invoiceItem.invoiceItems).pipe(
            map(item =>
              InvoiceItemActions.createInvoiceItem(action.payload.id, {
                ...item
              } as IInvoiceItem)
            )
          ),
          of(InvoiceActions.createSuccess(action.payload))
        )
      ))
    ))
  );

export default [
  fetchInvoicesEpic,
  fetchInvoiceEpic,
  editInvoiceEpic,
  calculateTotalEpic,
  createInvoicesEpic,
  deleteInvoiceEpic
];
