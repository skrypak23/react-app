import { combineEpics } from "redux-observable";
import customerEpics from "./customer/epics";
import productEpics from "./product/epics";
import invoiceEpics from "./invoice/epics";
import invoiceItemEpics from "./invoice-item/epics";

export default combineEpics(
  ...customerEpics,
  ...productEpics,
  ...invoiceEpics,
  ...invoiceItemEpics
);
