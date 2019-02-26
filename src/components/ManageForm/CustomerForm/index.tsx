import React, { FC } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import ICustomer from '../../../shared/models/Customer';
import { createCustomer, editCustomer } from '../../../redux/customer/actions';
import { RootAction, RootState } from '../../../redux/store/types';
import { State } from '../../../redux/customer/states';
import { ID } from '../../../shared/typing/records';

//const { createCustomer, editCustomer } = CustomerActions;

const FORM_FIELDS = [
  {
    label: 'Name',
    key: 'name',
    placeholder: 'Input name'
  },
  {
    label: 'Phone',
    key: 'phone',
    placeholder: 'Input phone'
  },
  {
    label: 'Address',
    key: 'address',
    placeholder: 'Input address'
  }
];

type Props = {
  editCustomer: (id: ID, customer: ICustomer) => any;
  createCustomer: (customer: ICustomer) => any;
  customer: State;
  isEdit: boolean;
};

const CustomerForm: FC<Props> = ({
  customer,
  createCustomer,
  editCustomer,
  isEdit
}) => {
  const handleSubmit = (values: ICustomer) => {
    isEdit
      ? editCustomer(customer.customer!.id, { ...values })
      : createCustomer({ ...values });
  };

  return (
    <BaseForm
      formFields={FORM_FIELDS}
      onSubmit={handleSubmit}
      formData={customer.customer}
      isEdit={isEdit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({ customer: state.customer });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      createCustomer,
      editCustomer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);
