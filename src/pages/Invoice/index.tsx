import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { InvoiceActions } from '../../actions';
import { State } from '../../reducers/invoice';
import { RootState } from '../../store/types';
import IInvoice from '../../models/Invoice';

const { fetchAllInvoices } = InvoiceActions;

type Props = {
  invoice: State;
  fetchAllInvoices: Function;
};

const Invoice: FC<Props> = props => {
  const { invoice } = props;
  useEffect(() => {
    props.fetchAllInvoices();
  }, []);

  return (
    <div>
      <Table data={invoice.invoices as Array<IInvoice>} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ invoice: state.invoice });
const mapDispatchToProps = { fetchAllInvoices };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
