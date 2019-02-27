import { combineReducers } from 'redux';
import customer from './customer/reducers';
import product from './product/reducers';
import invoice from './invoice/reducers';
import invoiceItem from './invoice-item/reducers';
import common from './common/reducers';

export default combineReducers({
    customer,
    product,
    invoice,
    invoiceItem,
    common
});
