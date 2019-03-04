import React, { useEffect, useState, FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Table from './Table';
import Drawer from '../../components/Drawer';
import { CustomerForm } from '../../components/ManageForm';
import { RootState, RootAction } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';
import { ActionBtn } from '../../components/ManageForm/style';
import ICustomer from '../../shared/models/Customer';
import * as CustomerActions from '../../redux/customer/actions';

type Props = {
  fetchCustomerById: (id: ID) => void;
  deleteCustomer: (id: ID) => void;
  fetchAllCustomers: () => void;
  resetCustomer: () => void;
  customers: ReadonlyArray<ICustomer>;
};

const Customer: FC<Props> = ({
  fetchAllCustomers,
  fetchCustomerById,
  deleteCustomer,
  resetCustomer,
  customers
}) => {
  const [visible, changeVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const showDrawer = () => changeVisible(true);
  const closeDrawer = () => {
    handleCloseForm();
    resetCustomer();
  };
  const handleEdit = (id: ID) => {
    fetchCustomerById(id);
    showDrawer();
    setIsEdit(true);
  };
  const handleCloseForm = () => {
    changeVisible(false);
    setIsEdit(false);
  };

  return (
    <div>
      <ActionBtn type="primary" onClick={showDrawer} htmlType="button">
        <Icon type="plus" /> Add Customer
      </ActionBtn>
      <Table data={customers} onEdit={handleEdit} onDelete={deleteCustomer} />
      <Drawer
        title={isEdit ? 'Edit the customer' : 'Create a new customer'}
        onClose={closeDrawer}
        visible={visible}
      >
        <CustomerForm isEdit={isEdit} onClose={handleCloseForm} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ customers: state.customer.entities });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchCustomerById: (id: ID) => dispatch(CustomerActions.fetchCustomer(id)),
  deleteCustomer: (id: ID) => dispatch(CustomerActions.deleteCustomer(id)),
  fetchAllCustomers: () => dispatch(CustomerActions.fetchCustomers()),
  resetCustomer: () => dispatch(CustomerActions.resetCustomerLocal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
