import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { CustomerActions } from '../../actions';
import { State } from '../../reducers/customer';
import { RootState } from '../../store/types';
import ICustomer from '../../models/Customer';

const { fetchCustomers } = CustomerActions;

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
      <Table data={customer.customers as Array<ICustomer>} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ customer: state.customer });
const mapDispatchToProps = { fetchCustomers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
