import IProduct from '../models/Product';
export const ALL_PRODUCTS = 'http://localhost:8000/api/products';

export const fetchAll = async (config: object = {}): Promise<IProduct[]> => {
  try {
    const res = await fetch(ALL_PRODUCTS, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
export const requestByID = async (id: string | number, config: object = {}): Promise<IProduct> => {
  try {
    const res = await fetch(`${ALL_PRODUCTS}/${id}`, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
};
