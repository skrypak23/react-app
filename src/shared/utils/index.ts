import { InvoiceItemRequest } from '../../redux/request/actions';
import IInvoiceItem from '../models/InvoiceItem';
import { filter, map } from 'rxjs/operators';
import { from } from 'rxjs';

export const createItems = (state$: any, action: any) => {
  return from(state$.value.invoiceItem.entities).pipe(
    filter(invoiceItem => !invoiceItem.hasOwnProperty('id')),
    map(item =>
      InvoiceItemRequest.Action.createInvoiceItem(action.payload.id, {
        ...item
      } as IInvoiceItem)
    )
  );
};
