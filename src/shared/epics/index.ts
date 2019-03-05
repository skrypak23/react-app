import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { differenceWith } from 'ramda';
import { InvoiceItemRequest } from '../../redux/request/actions';
import IInvoiceItem from '../models/InvoiceItem';

const diffItems = (state$: any) => {
  const items = state$.value.invoiceItem.entities;
  const requestedItems = state$.value.request.invoiceItem.fetch.data;

  const cmp = (x: IInvoiceItem, y: IInvoiceItem) => x.id === y.id;
  const createdItems = items.filter((iI: IInvoiceItem) => iI.hasOwnProperty('id'));
  return differenceWith(cmp, requestedItems, createdItems);
};

export const createItems = (state$: any, invoiceId: number) => {
  return from(state$.value.invoiceItem.entities).pipe(
    filter(invoiceItem => !invoiceItem.hasOwnProperty('id')),
    map(item =>
      InvoiceItemRequest.Action.createInvoiceItemRequest(invoiceId, {
        ...item
      } as IInvoiceItem)
    )
  );
};
export const editItems = (state$: any, invoiceId: number) => {
  const edited = state$.value.invoiceItem.edited;
  return from(Object.values<IInvoiceItem>(edited)).pipe(
    map(item =>
      InvoiceItemRequest.Action.editInvoiceItemRequest(item!.id, invoiceId, item)
    )
  );
};
export const deleteItems = (state$: any, invoiceId: number) => {
  const diff = diffItems(state$);
  return from(diff).pipe(
    map(item => InvoiceItemRequest.Action.deleteInvoiceItemRequest(item.id, invoiceId))
  );
};