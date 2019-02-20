const HOST = 'http://localhost:8000';
export const URL_ALL_CUSTOMERS = `${HOST}/api/customers`;
export const URL_ALL_INVOICE_ITEMS = `${HOST}/api/invoice-items`;
export const URL_ALL_INVOICES = `${HOST}/api/invoices`;
export const URL_ALL_PRODUCTS = `${HOST}/api/products`;

import fetchAll from './fetchAll';

export default { fetchAll };
