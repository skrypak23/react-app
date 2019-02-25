import { Observable, from } from "rxjs";
import { Action } from "redux";
import { isOfType } from "typesafe-actions";
import { switchMap, filter, mergeMap, map } from "rxjs/operators";
import { Epic, ofType, StateObservable } from "redux-observable";
import { RootAction, RootState } from "../../store/types";
import * as INVOICE_TYPES from "../actions/types";
import * as INVOICE_ITEMS_TYPES from "../../invoice-item/actions/types";
import * as InvoiceActions from "../actions";
import * as InvoiceItemActions from "../../invoice-item/actions";
import IInvoice from "../../../shared/models/Invoice";
import IInvoiceItem from "../../../shared/models/InvoiceItem";
import ApiService from "../../../shared/services/api.service";

const fetchInvoicesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.GET_INVOICES_REQUEST)),
    switchMap(action =>
      ApiService.fetchAllData<IInvoice>(InvoiceActions, action.payload)
    )
  );

const fetchInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST)),
    switchMap(action =>
      ApiService.fetchById<IInvoice>(InvoiceItemActions, action.payload)
    )
  );
const editInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.EDIT_INVOICE_REQUEST)),
    switchMap(action =>
      ApiService.editData<IInvoice>(InvoiceActions, action.payload)
    )
  );

const deleteInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.DELETE_INVOICE_REQUEST)),
    switchMap(action =>
      ApiService.deleteData<IInvoice>(InvoiceActions, action.payload)
    )
  );

const createInvoicesEpic = (
  action$: Observable<Action>,
  state$: StateObservable<any>
) =>
  action$.pipe(
    ofType(INVOICE_TYPES.CREATE_INVOICE_REQUEST),
    switchMap((action: any) =>
      ApiService.createData<IInvoice>(InvoiceActions, action.payload).pipe(
        mergeMap(action =>
          from(state$.value.invoiceItem.invoiceItems).pipe(
            map(item =>
              InvoiceItemActions.createInvoiceItem(action.payload.id, {
                ...item
              } as IInvoiceItem)
            )
          )
        )
      )
    )
  );

export default [
  fetchInvoicesEpic,
  fetchInvoiceEpic,
  editInvoiceEpic,
  deleteInvoiceEpic,
  createInvoicesEpic
];
