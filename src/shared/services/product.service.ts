import { from } from 'rxjs';
import IProduct from '../models/Product';
import * as API from '../utils/api';

type TData = {
  url: string;
  body?: IProduct;
};
const headers = { 'Content-Type': 'application/json' };

class ProductService {
  static createProduct(data: TData) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<IProduct>(data.url, config));
  }
  static editProduct(data: TData) {
    const config = {
      method: 'PUT',
      body: JSON.stringify(data.body),
      headers
    };

    return from(API.request<IProduct>(data.url, config));
  }
  static deleteProduct(data: TData) {
    const config = {
      method: 'DELETE'
    };

    return from(API.request<IProduct>(data.url, config));
  }
  static fetchProducts(data: TData) {
    return from(API.fetchAll<IProduct>(data.url));
  }
  static fetchProductById(data: TData) {
    return from(API.request<IProduct>(data.url));
  }
}

export default ProductService;
