import React, { useEffect, useState, FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import Table from './Table';
import Drawer from '../../components/Drawer';
import { CustomerActions } from '../../actions';
import { State } from '../../reducers/customer';
import { RootState } from '../../store/types';
import ICustomer from '../../models/Customer';
import { CustomerForm } from '../../components/ManageForm';

const { fetchData } = CustomerActions;

type Props = RouteComponentProps<any> & {
  customer: State;
  fetchData: Function;
};

const Customer: FC<Props> = props => {
  const { customer } = props;
  const [visible, changeVisible] = useState(false);
  const [isEdit, setMode] = useState(false);

  useEffect(() => {
    props.fetchData();
  }, []);

  const onClose = () => changeVisible(false);
  const showDrawer = () => changeVisible(true);

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        <Icon type="plus" /> Add Customer
      </Button>
      <Table data={customer.customers as Array<ICustomer>} />
      <Drawer title="Create a new customer" onClose={onClose} visible={visible}>
        {isEdit ? null : <CustomerForm />}
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ customer: state.customer });
const mapDispatchToProps = { fetchData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Customer));
