import React, { FC, useEffect, useState } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import { State } from '../../../redux/invoice/states';
import { State as CustomerState } from '../../../redux/customer/states';
import { State as ProductState } from '../../../redux/product/states';
import { State as InvoiceItemState } from '../../../redux/invoice-item/states';
import { RootAction, RootState } from '../../../redux/store/types';
import * as InvoiceActions from '../../../redux/invoice/actions';
import * as CustomerActions from '../../../redux/customer/actions';
import * as ProductActions from '../../../redux/product/actions';
import * as InvoiceItemActions from '../../../redux/invoice-item/actions';
import IInvoice from '../../../shared/models/Invoice';
import ICustomer from '../../../shared/models/Customer';
import { ID } from '../../../shared/typing/records';
import IInvoiceItem from '../../../shared/models/InvoiceItem';
import IProduct from "../../../shared/models/Product";

type Props = {
  editInvoice: (id: ID, invoice: IInvoice) => any;
  createInvoice: (invoice: IInvoice) => any;
  createInvoiceItem: (id: ID, invoiceItem: IInvoiceItem) => any;
  deleteInvoiceItemLocal: (id: ID) => any;
  customers: ReadonlyArray<ICustomer>
  fillInvoice: (invoice: IInvoice) => any;
  deleteInvoiceItem: (id: ID, invoiceId: ID) => any;
  customer: CustomerState;
  products: ReadonlyArray<IProduct>;
  invoiceItem: InvoiceItemState;
  invoice: State;
  isEdit: boolean;
  fillItems: (item: IInvoiceItem) => any;
  fetchAllInvoiceItems: (id: ID) => any;
  closeForm: () => void;
};

const { createInvoice, editInvoice, fillInvoice } = InvoiceActions;
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
  createInvoiceItem,
  fetchAllInvoiceItems,
  deleteInvoiceItemLocal,
  deleteInvoiceItem,
  isEdit,
  customer,
  products,
  fillItems,
  fillInvoice,
  closeForm
}) => {
  const handleSubmit = (values: IInvoice) => {
    if (isEdit) {
      editInvoice(invoice.invoice!.id, { ...values });
    } else {
      createInvoice({ ...values });
    }
  };

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
      customer = customers.find(
        customer => customer.id === invoice.invoice!.customer_id
      );
    }
    return customer || ({} as ICustomer);
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      handleCreateInvoiceItem={handleCreateInvoiceItem}
      customers={customer.customers as ICustomer[]}
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
  customer: state.customer,
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      createInvoiceItem,
      editInvoice,
      createInvoice,
      fillInvoice,
      fillItems,
      fetchAllInvoiceItems,
      deleteInvoiceItemLocal,
      deleteInvoiceItem
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceForm);
