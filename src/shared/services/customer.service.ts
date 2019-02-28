import { from } from 'rxjs';
import ICustomer from '../models/Customer';
import * as API from '../utils/api';

type TData = {
  url: string;
  body?: ICustomer;
};
const headers = { 'Content-Type': 'application/json' };

class CustomerService {
  static createCustomer(data: TData) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<ICustomer>(data.url, config));
  }
  static editCustomer(data: TData) {
    const config = {
      method: 'PUT',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<ICustomer>(data.url, config));
  }
  static deleteCustomer(data: TData) {
    const config = {
      method: 'DELETE'
    };

    return from(API.request<ICustomer>(data.url, config));
  }
  static fetchCustomers(data: TData) {
    return from(API.fetchAll<ICustomer>(data.url));
  }
  static fetchCustomerById(data: TData) {
    return from(API.request<ICustomer>(data.url));
  }
}

export default CustomerService;
