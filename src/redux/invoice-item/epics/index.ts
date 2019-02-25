import { of, Observable, concat } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { RootAction, RootState } from '../../store/types';
import { CUSTOMER_TYPES } from '../../../types';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import * as InvoiceItemActions from '../actions';
import { isOfType } from 'typesafe-actions';
import { Action } from 'redux';
import ApiService from '../../../shared/services/api.service';

const fetchInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST)),
        switchMap(action =>
            ApiService.fetchAllData<IInvoiceItem>(InvoiceItemActions, action.payload)
        )
    );

const fetchInvoiceItemsByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST)),
        switchMap(action => ApiService.fetchById<IInvoiceItem>(InvoiceItemActions, action.payload))
    );

const editInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST)),
        switchMap(action => ApiService.editData<IInvoiceItem>(InvoiceItemActions, action.payload))
    );


const createInvoiceItemsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST),
        switchMap((action: any) =>
            ApiService.createData<IInvoiceItem>(InvoiceItemActions, action.payload)
        )
    );

export default [
    fetchInvoiceItemsByIdEpic,
    fetchInvoiceItemsEpic,
    editInvoiceItemEpic,
    createInvoiceItemsEpic
];
