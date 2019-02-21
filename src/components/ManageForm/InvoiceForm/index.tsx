import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import BaseForm from './Form';
import { State } from '../../../reducers/invoice';
import { State as CustomerState } from '../../../reducers/customer';
import { RootState } from '../../../store/types';
import { InvoiceActions, CustomerActions } from '../../../actions';
import IInvoice from '../../../models/Invoice';
import ICustomer from '../../../models/Customer';

type Props = {
  createInvoice: Function;
  editInvoice: Function;
  fetchAllCustomers: Function;
  invoice: State;
  customer: CustomerState;
  isEdit: boolean;
};

const { createInvoice, editInvoice } = InvoiceActions;
const { fetchAllCustomers } = CustomerActions;

const InvoiceForm: FC<Props> = ({
  invoice,
  createInvoice,
  editInvoice,
  fetchAllCustomers,
  isEdit,
  customer
}) => {
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleSubmit = (values: IInvoice) => {
    isEdit
      ? editInvoice(invoice.invoice!.id, { ...values })
      : createInvoice({ ...values, total: 0 });
  };

  const findCustomer = (customers: ReadonlyArray<ICustomer>): ICustomer => {
    let customer;
    if (customers && invoice.invoice) {
      customer = customers.find(customer => customer.id === invoice.invoice!.customer_id);
    }
    return customer || ({} as ICustomer);
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      formData={(invoice.invoice as IInvoice) || {}}
      customers={customer.customers as ICustomer[]}
      customer={findCustomer(customer.customers)}
      isEdit={isEdit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.invoice,
  customer: state.customer
});
const mapDispatchToProps = { createInvoice, editInvoice, fetchAllCustomers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceForm);
