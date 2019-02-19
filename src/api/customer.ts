export const GET_CUSTOMERS = 'http://localhost:8000/api/customers';
export const GET_CUSTOMER_BY_ID = (_: any, id: string | number) => `${GET_CUSTOMERS}/${id}` 
