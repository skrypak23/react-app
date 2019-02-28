import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import ProductService from '../../../../../../../shared/services/product.service';
import { FetchProductActions, FetchProductsTypes } from '../actions';

type RootAction = ActionType<typeof FetchProductActions>;

export const fetchProductsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(FetchProductsTypes.FETCH_PRODUCTS_REQUEST)),
    switchMap(action =>
      ProductService.fetchProducts(action.payload).pipe(
        map(response => FetchProductActions.fetchProductsSuccess(response)),
        catchError(err => of(FetchProductActions.fetchProductsFailure(err)))
      )
    )
  );
