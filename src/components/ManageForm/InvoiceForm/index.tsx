import React, { FC, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import { State } from '../../../reducers/invoice';
import { State as CustomerState } from '../../../reducers/customer';
import { State as ProductState } from '../../../reducers/product';
import { State as InvoiceItemState } from '../../../reducers/invoice-item';
import { RootAction, RootState } from '../../../store/types';
import {
  InvoiceActions,
  CustomerActions,
  ProductActions,
  InvoiceItemActions
} from '../../../actions';
import IInvoice from '../../../models/Invoice';
import ICustomer from '../../../models/Customer';
import { ID } from '../../../common/types';
import IInvoiceItem from '../../../models/InvoiceItem';
import calculateTotal from '../../../common/calculateTotal';
import IProduct from '../../../models/Product';

type Props = {
  editInvoice: (id: ID, invoice: IInvoice) => any;
  createInvoice: (invoice: IInvoice) => any;
  createInvoiceItem: (id: ID, invoiceItem: IInvoiceItem) => any;
  deleteInvoiceItemLocal: (id: ID) => any;
  fetchAllCustomers: () => any;
  fetchAllProducts: () => any;
  fillInvoice: (invoice: IInvoice) => any;
  deleteInvoiceItem: (id: ID, invoiceId: ID) => any;
  customer: CustomerState;
  product: ProductState;
  invoiceItem: InvoiceItemState;
  invoice: State;
  isEdit: boolean;
  fillItems: (item: IInvoiceItem) => any;
  fetchAllInvoiceItems: (id: ID) => any;
};

const { createInvoice, editInvoice, fillInvoice } = InvoiceActions;
const { fetchAllCustomers } = CustomerActions;
const { fetchAllProducts } = ProductActions;
const {
  createInvoiceItem,
  fillItems,
  fetchAllInvoiceItems,
  deleteInvoiceItemLocal,
  deleteInvoiceItem
} = InvoiceItemActions;

const InvoiceForm: FC<Props> = ({
  invoice,
  invoiceItem,
  createInvoice,
  editInvoice,
  fetchAllCustomers,
  fetchAllProducts,
  createInvoiceItem,
  fetchAllInvoiceItems,
  deleteInvoiceItemLocal,
  deleteInvoiceItem,
  isEdit,
  customer,
  product,
  fillItems,
  fillInvoice
}) => {
  useEffect(() => {
    fetchAllCustomers();
    fetchAllProducts();
  }, []);
  useEffect(() => {
    if (invoice.invoice) fetchAllInvoiceItems(invoice.invoice.id);
  }, [invoice.invoice]);

  const handleSubmit = (values: IInvoice) => {
    if (isEdit) {
      editInvoice(invoice.invoice!.id, { ...values });
    } else {
      createInvoice({ ...values, total: 0 });
    }
  }

  const handleCreateInvoiceItem = (values: IInvoiceItem) => {
    fillItems(values);
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
      handleCreateInvoiceItem={handleCreateInvoiceItem}
      customers={customer.customers as ICustomer[]}
      customer={findCustomer(customer.customers)}
      products={product.products}
      invoice={invoice.invoice}
      invoiceItems={invoiceItem.invoiceItems}
      handleDelete={handleDelete}
      fillInvoice={fillInvoice}
      isEdit={isEdit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.invoice,
  invoiceItem: state.invoiceItem,
  customer: state.customer,
  product: state.product
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  createInvoiceItem: (id: ID, invoiceItem: IInvoiceItem) =>
    dispatch(createInvoiceItem(id, invoiceItem)),
  editInvoice: (id: ID, invoice: IInvoice) => dispatch(editInvoice(id, invoice)),
  createInvoice: (invoice: IInvoice) => dispatch(createInvoice(invoice)),
  fillInvoice: (invoice: IInvoice) => dispatch(fillInvoice(invoice)),
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  fillItems: (item: IInvoiceItem) => dispatch(fillItems(item)),
  fetchAllInvoiceItems: (id: ID) => dispatch(fetchAllInvoiceItems(id)),
  deleteInvoiceItemLocal: (id: ID) => dispatch(deleteInvoiceItemLocal(id)),
  deleteInvoiceItem: (id: ID, invoiceId: ID) => dispatch(deleteInvoiceItem(id, invoiceId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceForm);
