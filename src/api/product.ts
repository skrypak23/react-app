export const GET_PRODUCT = 'http://localhost:8000/api/customers';
export const GET_PRODUCT_BY_ID = (_: any, id: string | number) => `${GET_PRODUCT}/${id}` 
