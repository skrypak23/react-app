import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from '../../../../../../store/types';
import ProductService from '../../../../../../../shared/services/product.service';
import { FetchProductByIdTypes, FetchProductByIdActions } from '../actions';

type RootAction = ActionType<typeof FetchProductByIdActions>;

export const fetchProductByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(FetchProductByIdTypes.FETCH_PRODUCT_BY_ID_REQUEST)),
    switchMap(action =>
      ProductService.fetchProductById(action.payload).pipe(
        map(response => FetchProductByIdActions.fetchProductByIdSuccess(response)),
        catchError(err => of(FetchProductByIdActions.fetchProductByIdFailure(err)))
      )
    )
  );
