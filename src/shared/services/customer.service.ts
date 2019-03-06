import { Observable } from 'rxjs';
import ICustomer from '../models/Customer';
import * as API from '../utils/api';

type TFetch = {
  url: string;
};
type TData = TFetch & {
  body: ICustomer;
};

class CustomerService {
  static createCustomer(data: TData): Observable<ICustomer> {
    return API.createData<ICustomer>(data.url, data.body);
  }
  static editCustomer(data: TData): Observable<ICustomer> {
    return API.editData(data.url, data.body);
  }
  static deleteCustomer(data: TFetch): Observable<ICustomer> {
    return API.deleteData<ICustomer>(data.url);
  }
  static fetchCustomers(data: TFetch): Observable<ICustomer[]> {
    return API.getAll(data.url);
  }
  static fetchCustomerById(data: TFetch): Observable<ICustomer> {
    return API.getOne(data.url);
  }
}

export default CustomerService;
