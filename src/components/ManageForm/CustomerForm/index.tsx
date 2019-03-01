import React, { FC } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import ICustomer from '../../../shared/models/Customer';
import {RootAction, RootState} from '../../../redux/store/types';
import { ID } from '../../../shared/typing/records';
import { CustomerRequest } from '../../../redux/request/actions';

const { Action } = CustomerRequest;

const FORM_FIELDS = [
  {
    label: 'Name',
    key: 'name',
    placeholder: 'Input name',
    message: 'Please input name'
  },
  {
    label: 'Phone',
    key: 'phone',
    placeholder: 'Input phone',
    message: 'Please input phone'
  },
  {
    label: 'Address',
    key: 'address',
    placeholder: 'Input address',
    message: 'Please input address'
  }
];

type Props = {
  editCustomer: (id: ID, customer: ICustomer) => any;
  createCustomer: (customer: ICustomer) => any;
  customer: ICustomer | null;
  isEdit: boolean;
};

const CustomerForm: FC<Props> = ({ customer, createCustomer, editCustomer, isEdit }) => {
  const handleSubmit = (values: ICustomer) => {
    isEdit ? editCustomer(customer!.id, { ...values }) : createCustomer({ ...values });
  };

  return (
    <BaseForm
      formFields={FORM_FIELDS}
      onSubmit={handleSubmit}
      formData={customer}
      isEdit={isEdit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  customer: state.request.customer.fetchById.data
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  createCustomer: (customer: ICustomer) => dispatch(Action.createCustomer(customer)),
  editCustomer: (id: ID, customer: ICustomer) =>
    dispatch(Action.editCustomer(id, customer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);
