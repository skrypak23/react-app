import { filter, map } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../store/types';
import * as ProductActions from '../actions';
import { ProductRequest as Request } from '../../request/actions';

const { Action, Types } = Request;
const CombinedActions = { ...Action, ...ProductActions };
type Actions = ActionType<typeof CombinedActions>;

const setProductDataEpic: Epic<Actions, Actions, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        Types.CREATE_PRODUCT_SUCCESS,
        Types.UPDATE_PRODUCT_SUCCESS,
        Types.DELETE_PRODUCT_SUCCESS,
        Types.FETCH_PRODUCTS_SUCCESS
      ])
    ),
    map(action => {
      if (action.type === Types.DELETE_PRODUCT_SUCCESS) {
        return ProductActions.deleteProductData(action.payload);
      } else {
        if (Array.isArray(action.payload)) {
          return ProductActions.setProductData(action.payload);
        }
        return ProductActions.setProductData([action.payload]);
      }
    })
  );

export default [setProductDataEpic];
