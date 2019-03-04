import { filter, map } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { RootAction, RootState } from '../../store/types';
import * as InvoiceItemActions from '../actions';
import { InvoiceItemRequest as Request } from '../../request/actions';
import * as INVOICE_ITEM_TYPES from '../actions/types';
const { Types, Action } = Request;

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

const editInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.EDIT_INVOICE_ITEM)),
    map(action =>
      Action.editInvoiceItemRequest(
        action.payload.invoiceItemId,
        action.payload.invoiceId,
        action.payload.invoice
      )
    )
  );

const deleteInvoiceItemEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.DELETE_INVOICE_ITEM)),
    map(action =>
      Action.deleteInvoiceItemRequest(
        action.payload.invoiceItemId,
        action.payload.invoiceId
      )
    )
  );

const fetchInvoiceItemsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.FETCH_INVOICE_ITEMS)),
    map(action => Action.fetchAllInvoiceItemsRequest(action.payload.invoiceId))
  );

const fetchInvoiceItemByIdEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(INVOICE_ITEM_TYPES.FETCH_INVOICE_ITEM)),
    map(action =>
      Action.fetchInvoiceItemByIdRequest(
        action.payload.invoiceItemId,
        action.payload.invoiceId
      )
    )
  );

export default [
  setInvoiceItemDataEpic,
  fetchInvoiceItemByIdEpic,
  fetchInvoiceItemsEpic,
  editInvoiceItemEpic,
  deleteInvoiceItemEpic
];
