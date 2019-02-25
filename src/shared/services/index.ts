import fetchAllService from './fetchAll.service';
import request from './request.service';

const HOST = 'http://localhost:8000';
export const URL_ALL_CUSTOMERS = `${HOST}/api/customers`;
export const URL_ALL_INVOICES = `${HOST}/api/invoices`;
export const URL_ALL_PRODUCTS = `${HOST}/api/products`;

export default { fetchAll: fetchAllService, request };
