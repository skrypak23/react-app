import { from } from 'rxjs';
import IInvoiceItem from '../models/InvoiceItem';
import * as API from '../utils/api';

type TData = {
  url: string;
  body?: IInvoiceItem;
};
const headers = { 'Content-Type': 'application/json' };

class InvoiceItemService {
  static createInvoiceItem(data: TData) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<IInvoiceItem>(data.url, config));
  }
  static editInvoiceItem(data: TData) {
    const config = {
      method: 'PUT',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<IInvoiceItem>(data.url, config));
  }
  static deleteInvoiceItem(data: TData) {
    const config = {
      method: 'DELETE'
    };

    return from(API.request<IInvoiceItem>(data.url, config));
  }
  static fetchInvoiceItems(data: TData) {
    return from(API.fetchAll<IInvoiceItem>(data.url));
  }
  static fetchInvoiceItemById(data: TData) {
    return from(API.request<IInvoiceItem>(data.url));
  }
}

export default InvoiceItemService;
