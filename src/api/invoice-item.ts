import IInvoiceItem from '../models/InvoiceItem';
export const ALL_INVOICE_ITEMS = 'http://localhost:8000/api/invoice-items';

export const fetchAll = async (config: object = {}): Promise<IInvoiceItem[]> => {
  try {
    const res = await fetch(ALL_INVOICE_ITEMS, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
export const requestByID = async (
  id: string | number,
  config: object = {}
): Promise<IInvoiceItem> => {
  try {
    const res = await fetch(`${ALL_INVOICE_ITEMS}/${id}`, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
