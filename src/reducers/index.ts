import { combineReducers } from 'redux';
import customer from './customer';
import product from './product';
import invoice from './invoice';
import invoiceItem from './invoice-item';

export default combineReducers({
    customer,
    product,
    invoice,
    invoiceItem
});