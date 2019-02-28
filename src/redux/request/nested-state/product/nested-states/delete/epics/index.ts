import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../../../../../store/types';
import ProductService from '../../../../../../../shared/services/product.service';
import { DeleteProductTypes, DeleteProductActions } from '../actions';

type RootAction = ActionType<typeof DeleteProductActions>;

export const deleteProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(DeleteProductTypes.DELETE_PRODUCT_REQUEST)),
    switchMap(action =>
      ProductService.deleteProduct(action.payload).pipe(
        map(response => DeleteProductActions.deleteProductSuccess(response)),
        catchError(err => of(DeleteProductActions.deleteProductFailure(err)))
      )
    )
  );
