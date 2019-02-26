import IInvoiceItem from '../shared/models/InvoiceItem';
import IProduct from '../shared/models/Product';

export default (
  discount: number,
  items: ReadonlyArray<IInvoiceItem>,
  products: ReadonlyArray<IProduct>
): number => {
  let total = 0;
  if (items.length) {
    total = items.reduce((acc, curr) => {
      const product = products.find(p => p.id === curr.product_id);
      if (product) return acc + product.price * curr.quantity;
      return acc;
    }, 0);
    return total - total / 100 * discount;
  }
  return total;
};
