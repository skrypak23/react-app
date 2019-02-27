import React, { FC, useEffect, useState } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import { State } from '../../../redux/invoice/states';
import { State as CustomerState } from '../../../redux/customer/states';
import { State as InvoiceItemState } from '../../../redux/invoice-item/states';
import { RootAction, RootState } from '../../../redux/store/types';
import * as InvoiceActions from '../../../redux/invoice/actions';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';
import IInvoice from '../../../shared/models/Invoice';
import ICustomer from '../../../shared/models/Customer';
import { ID } from '../../../shared/typing/records';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import IProduct from '../../../shared/models/Product';

type Props = {
  editInvoice: (id: ID, invoice: IInvoice) => void;
  createInvoice: (invoice: IInvoice) => void;
  deleteInvoiceItemLocal: (id: ID) => void;
  customers: ReadonlyArray<ICustomer>;
  fillInvoice: (invoice: IInvoice) => void;
  deleteInvoiceItem: (id: ID, invoiceId: ID) => void;
  customer: CustomerState;
  products: ReadonlyArray<IProduct>;
  invoiceItem: InvoiceItemState;
  invoice: State;
  isEdit: boolean;
  closeForm: () => void;
};

const InvoiceForm: FC<Props> = ({
  invoice,
  invoiceItem,
  createInvoice,
  editInvoice,
  deleteInvoiceItemLocal,
  deleteInvoiceItem,
  isEdit,
  customer,
  products,
  fillInvoice,
  closeForm
}) => {
  const handleSubmit = (values: IInvoice) => {
    if (isEdit) {
      const id = invoice.invoice!.id;
      editInvoice(id, { id, ...values });
    } else {
      createInvoice({ ...values });
    }
    closeForm();
  };

  const handleDelete = (index: ID, invoiceItem: IInvoiceItem) => {
    if (invoiceItem.id) {
      deleteInvoiceItem(invoiceItem.id, invoice.invoice!.id);
    } else {
      deleteInvoiceItemLocal(index);
    }
  };

  const findCustomer = (customers: ReadonlyArray<ICustomer>): ICustomer => {
    let customer;
    if (customers && invoice.invoice) {
      customer = customers.find(customer => customer.id === invoice.invoice!.customer_id);
    }
    return customer || ({} as ICustomer);
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      customers={customer.customers}
      customer={findCustomer(customer.customers)}
      products={products}
      invoice={invoice.invoice}
      invoiceItems={invoiceItem.invoiceItems}
      handleDelete={handleDelete}
      fillInvoice={fillInvoice}
      isEdit={isEdit}
      closeForm={closeForm}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.invoice,
  invoiceItem: state.invoiceItem,
  customer: state.customer
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      ...InvoiceActions,
      ...InvoiceItemActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceForm);
