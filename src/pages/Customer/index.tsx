import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '../../components/Table';
import Actions from '../../actions';

const Customer = (props: any) => {
    useEffect(() => {
        props.fetchCustomers()
    })
  return (
    <div>
      <Table />
    </div>
  );
};

export default connect(
  null,
  { ...Actions.Customer }
)(Customer);
