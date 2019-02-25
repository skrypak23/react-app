import React, { useEffect, useState, FC } from 'react';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import Table from './Table';
import Drawer from '../../components/Drawer';
import { InvoiceForm } from '../../components/ManageForm';
import * as InvoiceActions from '../../redux/invoice/actions';
import * as CustomerActions from '../../redux/customer/actions';
import { State } from '../../redux/invoice/states';
import { State as CustomerState } from '../../redux/customer/states';
import { RootState, RootAction } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';

const {
  fetchAllInvoices,
  fetchInvoiceById,
  resetInvoice,
  deleteInvoice
} = InvoiceActions;
const { fetchAllCustomers } = CustomerActions;

type Props = RouteComponentProps<any> & {
  fetchInvoiceById: (id: ID) => any;
  deleteInvoice: (id: ID) => any;
  fetchAllCustomers: () => any;
  fetchAllInvoices: () => any;
  resetInvoice: () => any;
  customer: CustomerState;
  invoice: State;
};

const Invoice: FC<Props> = ({
  fetchAllCustomers,
  fetchAllInvoices,
  fetchInvoiceById,
  deleteInvoice,
  resetInvoice,
  customer,
  invoice
}) => {
  const [visible, changeVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchAllCustomers();
    fetchAllInvoices();
  }, []);

  const showDrawer = () => changeVisible(true);
  const handleEdit = (id: ID) => {
    fetchInvoiceById(id);
    showDrawer();
    setIsEdit(true);
  };
  const handleCloseForm = () => {
    changeVisible(false);
    setIsEdit(false);
    resetInvoice();
  };

  const findCustomerName = (id: ID): string => {
    const foundCustomer = customer.customers.find(
      customer => customer.id === id
    );
    return foundCustomer ? foundCustomer.name : '';
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer} htmlType="button">
        <Icon type="plus" /> Add Invoice
      </Button>
      <Table
        onEdit={handleEdit}
        data={invoice.invoices}
        onDelete={deleteInvoice}
        findCustomerName={findCustomerName}
      />
      <Drawer
        title="Create a new invoice"
        onClose={handleCloseForm}
        visible={visible}
      >
        <InvoiceForm isEdit={isEdit} fetchAllCustomers={fetchAllCustomers} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.invoice,
  customer: state.customer
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchInvoiceById: (id: ID) => dispatch(fetchInvoiceById(id)),
  fetchAllCustomers: () => dispatch(fetchAllCustomers()),
  deleteInvoice: (id: ID) => dispatch(deleteInvoice(id)),
  fetchAllInvoices: () => dispatch(fetchAllInvoices()),
  resetInvoice: () => dispatch(resetInvoice())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invoice));
