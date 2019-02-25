import IInvoiceItem from '../shared/models/InvoiceItem';
import IProduct from '../shared/models/Product';

export default (discount: number, items: IInvoiceItem[], products: IProduct[]): number =>
  items.reduce((acc, curr) => {
    const product = products.find(p => p.id === curr.product_id);
    if (product) return acc + product.price * curr.quantity;
    return acc;
  }, 0) - discount;