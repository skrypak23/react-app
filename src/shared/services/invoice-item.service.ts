import IInvoiceItem from '../models/InvoiceItem';
import * as API from '../utils/api';

type TFetch = {
  url: string;
};
type TData = TFetch & {
  body: IInvoiceItem;
};

class InvoiceItemService {
  static createInvoiceItem(data: TData) {
    return API.createData<IInvoiceItem>(data.url, data.body);
  }
  static editInvoiceItem(data: TData) {
    return API.editData(data.url, data.body);
  }
  static deleteInvoiceItem(data: TFetch) {
    return API.deleteData<IInvoiceItem>(data.url);
  }
  static fetchInvoiceItems(data: TFetch) {
    return API.getAll<IInvoiceItem>(data.url);
  }
  static fetchInvoiceItemById(data: TFetch) {
    return API.getOne<IInvoiceItem>(data.url);
  }
}

export default InvoiceItemService;
