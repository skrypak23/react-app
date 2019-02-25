const HOST = "http://localhost:8000";
export const URL_ALL_CUSTOMERS = `${HOST}/api/customers`;
export const URL_ALL_INVOICES = `${HOST}/api/invoices`;
export const URL_ALL_PRODUCTS = `${HOST}/api/products`;

export async function request<T>(url: string, config: object = {}): Promise<T> {
  try {
    const res = await fetch(url, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
}

export async function fetchAll<T>(
  url: string,
  config: object = {}
): Promise<T[]> {
  try {
    const res = await fetch(url, config);
    return await res.json();
  } catch (err) {
    throw err;
  }
}
