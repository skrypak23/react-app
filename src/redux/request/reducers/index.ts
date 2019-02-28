import { combineReducers } from 'redux';
import customer from '../nested-state/customer/reducers';
import product from '../nested-state/product/reducers';
import invoiceItem from '../nested-state/invoice-item/reducers';

export default combineReducers({
  customer,
  product,
  invoiceItem
});
