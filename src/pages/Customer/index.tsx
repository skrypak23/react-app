import React, { useEffect, useState, FC } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import Table from './Table';
import Drawer from '../../components/Drawer';
import { CustomerForm } from '../../components/ManageForm';
import * as CustomerActions from '../../redux/customer/actions';
import { State } from '../../redux/customer/states';
import { RootState, RootAction } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';
import { ActionBtn } from '../../components/ManageForm/style';

type Props = {
  fetchCustomerById: (id: ID) => void;
  deleteCustomer: (id: ID) => void;
  fetchAllCustomers: () => void;
  resetCustomer: () => void;
  customer: State;
};

const Customer: FC<Props> = ({
  fetchAllCustomers,
  fetchCustomerById,
  deleteCustomer,
  resetCustomer,
  customer
}) => {
  const [visible, changeVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const showDrawer = () => changeVisible(true);
  const handleEdit = (id: ID) => {
    fetchCustomerById(id);
    showDrawer();
    setIsEdit(true);
  };
  const handleCloseForm = () => {
    changeVisible(false);
    setIsEdit(false);
    resetCustomer();
  };

  return (
    <div>
      <ActionBtn type="primary" onClick={showDrawer} htmlType="button">
        <Icon type="plus" /> Add Customer
      </ActionBtn>
      <Table data={customer.customers} onEdit={handleEdit} onDelete={deleteCustomer} />
      <Drawer title="Create a new customer" onClose={handleCloseForm} visible={visible}>
        <CustomerForm isEdit={isEdit} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ customer: state.customer });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      ...CustomerActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
