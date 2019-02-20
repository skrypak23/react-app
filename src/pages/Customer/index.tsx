import React, { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Divider } from 'antd';
import { CustomerActions } from '../../actions';
import { State } from '../../reducers/customer';
import { RootState } from '../../store/types';
import ICustomer from '../../models/Customer';

const { fetchCustomers } = CustomerActions;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <Link to="javascript:;">{text}</Link>
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <span>
        <Link to="javascript:;">Edit</Link>
        <Divider type="vertical" />
        <Link to="javascript:;">Delete</Link>
      </span>
    )
  }
];

type Props = {
  customer: State;
  fetchCustomers: Function;
};

const Customer: FC<Props> = props => {
  const { customer } = props;
  useEffect(() => {
    props.fetchCustomers();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={customer.customers as Array<ICustomer>}
        rowKey={record => `${record.id}`}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ customer: state.customer });
const mapDispatchToProps = { fetchCustomers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
