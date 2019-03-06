import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const HOST = 'http://localhost:8000';
export const URL_ALL_CUSTOMERS = `${HOST}/api/customers`;
export const URL_ALL_INVOICES = `${HOST}/api/invoices`;
export const URL_ALL_PRODUCTS = `${HOST}/api/products`;

const HEADERS = {
  'Content-Type': 'application/json'
};

export const getAll = <T>(url: string): Observable<T[]> => ajax.getJSON(url);
export const getOne = <T>(url: string): Observable<T> => ajax.getJSON(url);
export const deleteData = <T>(url: string): Observable<T> =>
  ajax.delete(url).pipe(map(rs => rs.response));
export const createData = <T>(url: string, body: T): Observable<T> =>
  ajax.post(url, JSON.stringify(body), HEADERS).pipe(map(rs => rs.response));
export const editData = <T>(url: string, body: T): Observable<T> =>
  ajax.put(url, JSON.stringify(body), HEADERS).pipe(map(rs => rs.response));
