import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { InvoiceItemActions } from '../../actions';
import { State } from '../../reducers/invoice-item';
import { RootState } from '../../store/types';
import IInvoiceItem from '../../models/InvoiceItem';

const { fetchAllInvoiceItems } = InvoiceItemActions;

type Props = {
  invoice: State;
  fetchAllInvoiceItems: Function;
};

const Invoice: FC<Props> = props => {
  const { invoice } = props;
  useEffect(() => {
    props.fetchAllInvoiceItems();
  }, []);

  return (
    <div>
      <Table data={invoice.invoiceItems as Array<IInvoiceItem>} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ invoice: state.invoiceItem });
const mapDispatchToProps = { fetchAllInvoiceItems };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
