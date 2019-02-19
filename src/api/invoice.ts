import IInvoice from '../models/Invoice';
export const ALL_INVOICES = 'http://localhost:8000/api/invoices';

export const fetchAll = async (config: object = {}): Promise<IInvoice[]> => {
  try {
    const res = await fetch(ALL_INVOICES, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
export const requestByID = async (id: string | number, config: object = {}): Promise<IInvoice> => {
  try {
    const res = await fetch(`${ALL_INVOICES}/${id}`, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
