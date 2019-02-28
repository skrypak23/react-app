import customerEpics from '../nested-state/customer/epics';
import productEpics from '../nested-state/product/epics';
import invoiceItemEpics from '../nested-state/invoice-item/epics';

export default [...customerEpics, ...productEpics, ...invoiceItemEpics];
