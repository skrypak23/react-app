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
  deleteInvoiceItem: (id: ID, invoiceId: ID) => any;
  customer: CustomerState;
  product: ProductState;
  invoiceItem: InvoiceItemState;
  invoice: State;
  isEdit: boolean;
  fillItems: (item: IInvoiceItem) => any;
  setInvoice: Function;
  fetchAllInvoiceItems: (id: ID) => any;
  invoiceData: IInvoice
};

const { createInvoice, editInvoice } = InvoiceActions;
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
  setInvoice,
    invoiceData
}) => {
  useEffect(() => {
    fetchAllCustomers();
    fetchAllProducts();
  }, []);
  useEffect(() => {
    if (invoice.invoice) fetchAllInvoiceItems(invoice.invoice.id);
  }, [invoice.invoice]);
  setInvoice(invoice.invoice);

  const handleSubmit = (values: IInvoice) => {
    if (isEdit) {
      editInvoice(invoice.invoice!.id, { ...values });
    } else {
      createInvoice({ ...values, total: 0 });
    }
  };

  const handleCreateInvoiceItem = (id: ID, values: IInvoiceItem) => {
    fillItems(values);
    console.log(invoiceData);
    calculateTotal(
       0,
      [...invoiceItem.invoiceItems, values] as IInvoiceItem[],
      product.products as IProduct[]
    );
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
      invoice={invoiceData}
      invoiceItems={invoiceItem.invoiceItems}
      handleDelete={handleDelete}
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
