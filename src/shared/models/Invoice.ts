import {ID} from "../../common/types";

interface IInvoice {
  id: ID;
  customer_id: number;
  discount: number;
  total: number;
}

export default IInvoice;
