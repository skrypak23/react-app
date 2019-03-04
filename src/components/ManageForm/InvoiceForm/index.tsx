import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import { RootAction, RootState } from '../../../redux/store/types';
import IInvoice from '../../../shared/models/Invoice';
import ICustomer from '../../../shared/models/Customer';
import { ID } from '../../../shared/typing/records';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import IProduct from '../../../shared/models/Product';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';
import { InvoiceRequest, InvoiceItemRequest } from '../../../redux/request/actions';
const { Action: InvoiceAction } = InvoiceRequest;
const { Action: InvoiceItemAction } = InvoiceItemRequest;

type Props = {
  invoice: IInvoice | null;
  invoiceItem: IInvoiceItem | null;
  products: ReadonlyArray<IProduct>;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  customers: ReadonlyArray<ICustomer>;
  isEdit: boolean;
  editInvoice: (id: ID, invoice: IInvoice) => void;
  createInvoice: (invoice: IInvoice) => void;
  deleteInvoiceItem: (id: ID) => void;
  fillInvoice: (invoice: IInvoice) => void;
  closeForm: () => void;
};

const InvoiceForm: FC<Props> = ({
  invoice,
  invoiceItem,
  invoiceItems,
  createInvoice,
  editInvoice,
  deleteInvoiceItem,
  isEdit,
  customers,
  products,
  fillInvoice,
  closeForm
}) => {
  const handleSubmit = (values: IInvoice) => {
    if (isEdit) {
      const id = invoice!.id;
      editInvoice(id, { id, ...values });
    } else {
      createInvoice({ ...values });
    }
    closeForm();
  };

  const handleDelete = (index: ID, invoiceItem: IInvoiceItem) => {
      deleteInvoiceItem(index);
  };

  const findCustomer = (customers: ReadonlyArray<ICustomer>): ICustomer => {
    let customer;
    if (customers && invoice) {
      customer = customers.find(customer => customer.id === invoice!.customer_id);
    }
    return customer || ({} as ICustomer);
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      customers={customers}
      customer={findCustomer(customers)}
      products={products}
      invoice={invoice}
      invoiceItems={invoiceItems}
      handleDelete={handleDelete}
      fillInvoice={fillInvoice}
      isEdit={isEdit}
      closeForm={closeForm}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.request.invoice.fetchById.data,
  invoiceItem: state.request.invoiceItem.fetchById.data,
  invoiceItems: state.invoiceItem.entities,
  customers: state.customer.entities
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  editInvoice: (id: ID, invoice: IInvoice) =>
    dispatch(InvoiceAction.editInvoice(id, invoice)),
  createInvoice: (invoice: IInvoice) => dispatch(InvoiceAction.createInvoice(invoice)),
  fillInvoice: (invoice: IInvoice) => dispatch(InvoiceAction.fillInvoice(invoice)),
  deleteInvoiceItem: (id: ID) =>
    dispatch(InvoiceItemActions.deleteInvoiceItemLocal(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceForm);
