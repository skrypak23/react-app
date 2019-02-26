import React, { useEffect, useState, FC } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import Table from './Table';
import * as InvoiceActions from '../../redux/invoice/actions';
import * as CustomerActions from '../../redux/customer/actions';
import * as ProductActions from '../../redux/product/actions';
import * as InvoiceItemsActions from '../../redux/invoice-item/actions';
import { State } from '../../redux/invoice/states';
import { State as CustomerState } from '../../redux/customer/states';
import { State as InvoiceItemsState } from '../../redux/invoice-item/states';
import { State as ProductState } from '../../redux/product/states';
import { RootState, RootAction } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';
import Edit from './Edit';
import IInvoice from '../../shared/models/Invoice';
import IInvoiceItem from '../../shared/models/InvoiceItem';

const {
  fetchAllInvoices,
  fetchInvoiceById,
  resetInvoice,
  deleteInvoice,
  fillInvoice
} = InvoiceActions;
const {
  fetchAllInvoiceItems,
  addInvoiceItem,
  deleteInvoiceItem,
  deleteInvoiceItemLocal,
  fetchInvoiceItemById
} = InvoiceItemsActions;
const { fetchAllCustomers } = CustomerActions;
const { fetchAllProducts } = ProductActions;

type Props = {
  fetchAllInvoiceItems: (id: ID) => void;
  deleteInvoice: (id: ID) => void;
  fetchAllCustomers: () => void;
  fetchAllProducts: () => void;
  fetchAllInvoices: () => void;
  fetchInvoiceById: (id: ID) => void;
  resetInvoice: () => void;
  fillInvoice: (invoice: IInvoice) => void;
  invoiceItem: InvoiceItemsState;
  customer: CustomerState;
  product: ProductState;
  invoice: State;
};

const Invoice: FC<Props> = ({
  fetchAllCustomers,
  fetchAllInvoices,
  fetchInvoiceById,
  deleteInvoice,
  resetInvoice,
  customer,
  invoice,
  invoiceItem,
  product,
  fillInvoice,
  fetchAllProducts,
  fetchAllInvoiceItems,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAllCustomers();
    fetchAllInvoices();
    fetchAllProducts();
  }, []);

  const handleEdit = (id: ID) => {
    fetchInvoiceById(id);
    fetchAllInvoiceItems(id);
    setShowForm(true);
    setIsEdit(true);
  };
  const toggleShowForm = () => setShowForm(!showForm);
  const findCustomerName = (id: ID): string => {
    const foundCustomer = customer.customers.find(
      customer => customer.id === id
    );
    return foundCustomer ? foundCustomer.name : '';
  };

  return (
    <div>
      {showForm ? (
        <Edit
          toggleShowForm={toggleShowForm}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      ) : (
        <>
          <Button type="primary" onClick={toggleShowForm} htmlType="button">
            <Icon type="plus" /> Add Invoice
          </Button>
          <Table
            onEdit={handleEdit}
            data={invoice.invoices}
            onDelete={deleteInvoice}
            findCustomerName={findCustomerName}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.invoice,
  customer: state.customer,
  invoiceItem: state.invoiceItem,
  product: state.product
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      fetchAllInvoiceItems,
      fetchInvoiceById,
      fetchAllCustomers,
      deleteInvoice,
      fetchAllInvoices,
      fetchAllProducts,
      resetInvoice,
      fillInvoice,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
