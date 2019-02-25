import { of, Observable, concat } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { RootAction, RootState } from '../../store/types';
import { CUSTOMER_TYPES } from '../../../types';
import IProduct from '../../../shared/models/Product';
import * as ProductActions from '../actions';
import { isOfType } from 'typesafe-actions';
import { Action } from 'redux';
import ApiService from '../../../shared/services/api.service';

const fetchProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMERS_REQUEST)),
        switchMap(action =>
            ApiService.fetchAllData<IProduct>(ProductActions, action.payload)
        )
    );

const fetchProductsByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(CUSTOMER_TYPES.GET_CUSTOMER_BY_ID_REQUEST)),
        switchMap(action => ApiService.fetchById<IProduct>(ProductActions, action.payload))
    );

const editProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(CUSTOMER_TYPES.EDIT_CUSTOMER_REQUEST)),
        switchMap(action => ApiService.editData<IProduct>(ProductActions, action.payload))
    );

const deleteProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(CUSTOMER_TYPES.DELETE_CUSTOMER_REQUEST)),
        switchMap(action =>
            concat(
                ApiService.deleteData<IProduct>(ProductActions, action.payload),
                of(ProductActions.fetchAllProducts())
            )
        )
    );

const createProductsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(CUSTOMER_TYPES.CREATE_CUSTOMER_REQUEST),
        switchMap((action: any) =>
            ApiService.createData<IProduct>(ProductActions, action.payload)
        )
    );

export default [
    fetchProductsByIdEpic,
    fetchProductsEpic,
    editProductEpic,
    deleteProductsEpic,
    createProductsEpic
];
