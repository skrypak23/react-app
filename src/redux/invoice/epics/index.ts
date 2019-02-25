import {Epic, ofType, StateObservable} from "redux-observable";
import {RootAction, RootState} from "../../store/types";
import {INVOICE_ITEMS_TYPES, INVOICE_TYPES} from "../../../types";
import IInvoice from "../../../shared/models/Invoice";
import {InvoiceActions, InvoiceItemActions} from "../../../actions";
import IInvoiceItem from "../../../shared/models/InvoiceItem";
import {Action} from "redux";
import {isOfType} from "typesafe-actions";
import {switchMap, filter, mergeMap, map} from "rxjs/operators";
import ApiService from "../../../shared/services/api.service";
import ICustomer from "../../../shared/models/Customer";
import {Observable} from "rxjs";

const fetchInvoicesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(INVOICE_TYPES.GET_INVOICES_REQUEST)),
        switchMap(action => ApiService.fetchAllData<IInvoice>(InvoiceActions, action.payload))
    );

const fetchInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(INVOICE_ITEMS_TYPES.GET_INVOICE_ITEMS_BY_ID_REQUEST)),
        switchMap(action => ApiService.fetchById<IInvoice>(InvoiceItemActions, action.payload))
    );
const editInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(INVOICE_TYPES.EDIT_INVOICE_REQUEST)),
        switchMap(action => ApiService.editData<IInvoice>(InvoiceActions, action.payload))
    );

const deleteInvoiceEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_TYPES.DELETE_INVOICE_REQUEST)),
    switchMap(action => ApiService.deleteData<IInvoice>(InvoiceActions, action.payload))
  );

const createInvoicesEpic = (action$: Observable<Action>, state$: StateObservable<any>) =>
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