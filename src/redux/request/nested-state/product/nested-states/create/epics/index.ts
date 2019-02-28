import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import ProductService from '../../../../../../../shared/services/product.service';
import { CreateProductTypes, CreateProductActions } from '../actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../../../../../store/types';

type RootAction = ActionType<typeof CreateProductActions>;

export const createProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(CreateProductTypes.CREATE_PRODUCT_REQUEST)),
    switchMap(action =>
      ProductService.createProduct(action.payload).pipe(
        map(response => CreateProductActions.createProductSuccess(response)),
        catchError(err => of(CreateProductActions.createProductFailure(err)))
      )
    )
  );
