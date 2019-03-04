import { filter, map, mergeMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../store/types';
import * as InvoiceItemActions from '../actions';
import { InvoiceItemRequest as Request } from '../../request/actions';

const { Types } = Request;

const setInvoiceItemDataEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(
      isOfType([
        Types.CREATE_INVOICE_ITEM_SUCCESS,
        Types.UPDATE_INVOICE_ITEM_SUCCESS,
        Types.FETCH_INVOICE_ITEMS_SUCCESS,
        Types.DELETE_INVOICE_ITEM_SUCCESS
      ])
    ),
    map(action => {
      if (action.type === Types.DELETE_INVOICE_ITEM_SUCCESS) {
        return InvoiceItemActions.deleteInvoiceItemData(action.payload);
      } else {
        if (Array.isArray(action.payload)) {
          return InvoiceItemActions.setInvoiceItemData(action.payload);
        }
        return InvoiceItemActions.setInvoiceItemData([action.payload]);
      }
    })
  );


export default [setInvoiceItemDataEpic];
