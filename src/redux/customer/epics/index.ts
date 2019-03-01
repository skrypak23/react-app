import { filter, map } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { ActionType, isOfType } from 'typesafe-actions';
import { RootState } from '../../store/types';
import * as CustomerActions from '../actions';
import { CustomerRequest as Request } from '../../request/actions';

const { Action, Types } = Request;
const CombinedActions = { ...Action, ...CustomerActions };
type Actions = ActionType<typeof CombinedActions>;

const setCustomerDataEpic: Epic<Actions, Actions, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        Types.CREATE_CUSTOMER_SUCCESS,
        Types.UPDATE_CUSTOMER_SUCCESS,
        Types.FETCH_CUSTOMERS_SUCCESS,
        Types.DELETE_CUSTOMER_SUCCESS
      ])
    ),
    map(action => {
      if (action.type === Types.DELETE_CUSTOMER_SUCCESS) {
        return CustomerActions.deleteActionData(action.payload);
      } else {
        if (Array.isArray(action.payload)) {
          return CustomerActions.setCustomerData(action.payload);
        }
        return CustomerActions.setCustomerData([action.payload]);
      }
    })
  );

export default [setCustomerDataEpic];
