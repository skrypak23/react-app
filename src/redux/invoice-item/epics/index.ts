import { filter, map, mergeMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../store/types';
import * as InvoiceItemActions from '../actions';
import { InvoiceItemRequest as Request, InvoiceRequest } from '../../request/actions';
import { createItems } from '../../../shared/utils';

const { Types } = Request;
const { Types: InvoiceTypes } = InvoiceRequest;

const setCustomerDataEpic: Epic<RootAction, RootAction, RootState> = action$ =>
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

const createInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(InvoiceTypes.CREATE_INVOICE_SUCCESS)),
    mergeMap(action => createItems(state$, action))
  );

export default [setCustomerDataEpic, createInvoiceItemEpic];
