import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import ProductService from '../../../../../../../shared/services/product.service';
import IProduct from '../../../../../../../shared/models/Product';
import { UpdateProductTypes, UpdateProductActions } from '../actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../../../../../store/types';

type RootAction = ActionType<typeof UpdateProductActions>;

export const updateProductEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(UpdateProductTypes.UPDATE_PRODUCT_REQUEST)),
    switchMap(action =>
      ProductService.editProduct(action.payload).pipe(
        map(response => UpdateProductActions.editProductSuccess(response)),
        catchError(err => of(UpdateProductActions.editProductFailure(err)))
      )
    )
  );
