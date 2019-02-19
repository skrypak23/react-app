import ICustomer from '../models/Customer';
export const ALL_CUSTOMERS = 'http://localhost:8000/api/customers';

export const fetchAll = async (config: object = {}): Promise<ICustomer[]> => {
  try {
    const res = await fetch(ALL_CUSTOMERS, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
export const requestByID = async (id: string | number, config: object = {}): Promise<ICustomer> => {
  try {
    const res = await fetch(`${ALL_CUSTOMERS}/${id}`, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
