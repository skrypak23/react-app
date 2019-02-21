import fetchAll from './fetchAll';
import request from './request';

const HOST = 'http://localhost:8000';
export const URL_ALL_CUSTOMERS = `${HOST}/api/customers`;
export const URL_ALL_INVOICES = `${HOST}/api/invoices`;
export const URL_ALL_PRODUCTS = `${HOST}/api/products`;

export default { fetchAll, request };
