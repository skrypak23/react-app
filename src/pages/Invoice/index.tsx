import React, { useEffect, useState, FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Table from './Table';
import { RootAction, RootState } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';
import Edit from './Edit';
import { ActionBtn } from '../../components/ManageForm/style';
import ICustomer from '../../shared/models/Customer';
import IInvoice from '../../shared/models/Invoice';
import * as InvoiceItemActions from '../../redux/invoice-item/actions';
import * as InvoiceActions from '../../redux/invoice/actions';
import * as CustomerActions from '../../redux/customer/actions';
import * as ProductActions from '../../redux/product/actions';
import withToast from '../../hoc/withToast';

type Props = {
  fetchAllInvoiceItems: (id: ID) => void;
  deleteInvoice: (id: ID) => void;
  fetchAllCustomers: () => void;
  fetchAllProducts: () => void;
  fetchAllInvoices: () => void;
  fetchInvoiceById: (id: ID) => void;
  customers: ReadonlyArray<ICustomer>;
  invoices: ReadonlyArray<IInvoice>;
  resetInvoiceItems: () => void;
};

const Invoice: FC<Props> = ({
  fetchAllCustomers,
  fetchAllInvoices,
  fetchInvoiceById,
  deleteInvoice,
  customers,
  invoices,
  fetchAllProducts,
  fetchAllInvoiceItems,
  resetInvoiceItems
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAllCustomers();
    fetchAllInvoices();
    fetchAllProducts();
  }, []);

  const handleEdit = (id: ID) => {
    resetInvoiceItems();
    fetchInvoiceById(id);
    fetchAllInvoiceItems(id);
    setShowForm(true);
    setIsEdit(true);
  };
  const toggleShowForm = () => setShowForm(!showForm);
  const findCustomerName = (id: ID): string => {
    const foundCustomer = customers.find(customer => customer.id === id);
    return foundCustomer ? foundCustomer.name : '';
  };

  const handleOpenEdit = () => {
    resetInvoiceItems();
    toggleShowForm();
  };

  return (
    <div>
      {showForm ? (
        <Edit toggleShowForm={toggleShowForm} isEdit={isEdit} setIsEdit={setIsEdit} />
      ) : (
        <>
          <ActionBtn type="primary" onClick={handleOpenEdit} htmlType="button">
            <Icon type="plus" /> Add Invoice
          </ActionBtn>
          <Table
            onEdit={handleEdit}
            data={invoices}
            onDelete={deleteInvoice}
            findCustomerName={findCustomerName}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  invoices: state.invoice.entities,
  customers: state.customer.entities
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchAllInvoiceItems: (invoiceId: ID) =>
    dispatch(InvoiceItemActions.fetchInvoiceItems(invoiceId)),
  fetchAllCustomers: () => dispatch(CustomerActions.fetchCustomers()),
  fetchAllProducts: () => dispatch(ProductActions.fetchProducts()),
  fetchAllInvoices: () => dispatch(InvoiceActions.fetchInvoices()),
  deleteInvoice: (id: ID) => dispatch(InvoiceActions.deleteInvoice(id)),
  fetchInvoiceById: (id: ID) => dispatch(InvoiceActions.fetchInvoice(id)),
  resetInvoiceItems: () => dispatch(InvoiceItemActions.resetInvoiceItems())
});

export default withToast(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Invoice)
);
