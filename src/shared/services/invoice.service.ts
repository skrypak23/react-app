import { from } from 'rxjs';
import IInvoice from '../models/Invoice';
import * as API from '../utils/api';

type TData = {
  url: string;
  body?: IInvoice;
};
const headers = { 'Content-Type': 'application/json' };

class InvoiceService {
  static createInvoice(data: TData) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<IInvoice>(data.url, config));
  }
  static editInvoice(data: TData) {
    const config = {
      method: 'PUT',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<IInvoice>(data.url, config));
  }
  static deleteInvoice(data: TData) {
    const config = {
      method: 'DELETE'
    };

    return from(API.request<IInvoice>(data.url, config));
  }
  static fetchInvoices(data: TData) {
    return from(API.fetchAll<IInvoice>(data.url));
  }
  static fetchInvoiceById(data: TData) {
    return from(API.request<IInvoice>(data.url));
  }
}

export default InvoiceService;
