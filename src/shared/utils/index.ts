import { unionWith, eqBy, reverse, prop, reject, propEq } from 'ramda';
import { InvoiceItemRequest } from '../../redux/request/actions';
import IInvoiceItem from '../models/InvoiceItem';
import { filter, map } from 'rxjs/operators';
import { from } from 'rxjs';

interface IWithID {
  id: number;
}

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

export function union<T extends IWithID>(payload: Array<T>, entities: ReadonlyArray<T>) {
  return unionWith<T>(eqBy(prop('id')), reverse(payload), entities);
}

export function deleteData<T extends IWithID>(payload: T, entities: ReadonlyArray<T>) {
  return reject<T>(propEq('id', payload.id), entities);
}
