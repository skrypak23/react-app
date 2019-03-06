import IInvoice from '../models/Invoice';
import * as API from '../utils/api';

type TFetch = {
  url: string;
};

type TData = TFetch & {
  body: IInvoice;
};

class InvoiceService {
  static createInvoice(data: TData) {
    return API.createData<IInvoice>(data.url, data.body);
  }
  static editInvoice(data: TData) {
    return API.editData<IInvoice>(data.url, data.body);
  }
  static deleteInvoice(data: TFetch) {
    return API.deleteData<IInvoice>(data.url);
  }
  static fetchInvoices(data: TFetch) {
    return API.getAll<IInvoice>(data.url);
  }
  static fetchInvoiceById(data: TFetch) {
    return API.getOne<IInvoice>(data.url);
  }
}

export default InvoiceService;
