import * as InvoiceItemActions from '../redux/invoice-item/actions';
import IInvoiceItem from './models/InvoiceItem';
import { filter, map } from 'rxjs/operators';
import { from } from 'rxjs';

export const filteredData = (data: ReadonlyArray<any>, id: number) =>
  data.filter(fD => fD.id !== id);
export const filteredDataByIdx = (data: ReadonlyArray<any>, id: number) =>
  data.filter((_, idx) => idx !== id);
export const mapedDataByIdx = (data: ReadonlyArray<any>, payloadData: any) =>
  data.map((mD, idx) => {
    if (idx === payloadData.id) return payloadData;
    return mD;
  });
export const mapedData = (data: ReadonlyArray<any>, payloadData: any) =>
  data.map(mD => {
    if (mD.id === payloadData.id) return payloadData;
    return mD;
  });

export const createItems = (state$: any, action: any) => {
  return from(state$.value.invoiceItem.invoiceItems).pipe(
    filter((invoiceItem: any) => !invoiceItem.hasOwnProperty('id')),
    map(item =>
      InvoiceItemActions.createInvoiceItem(action.payload.id, {
        ...item
      } as IInvoiceItem)
    )
  );
};
