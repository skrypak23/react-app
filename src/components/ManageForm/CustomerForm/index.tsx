import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import ICustomer from '../../../shared/models/Customer';
import { RootAction, RootState } from '../../../redux/store/types';
import { ID } from '../../../shared/typing/records';
import * as CustomerActions from '../../../redux/customer/actions';

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
  onClose: () => void;
  customer: ICustomer | null;
  isEdit: boolean;
};


const CustomerForm: FC<Props> = ({
  customer,
  createCustomer,
  editCustomer,
  isEdit,
  onClose
}) => {
  const handleSubmit = (values: ICustomer) => {
    isEdit ? editCustomer(customer!.id, { ...values }) : createCustomer({ ...values });
    onClose();
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
  createCustomer: (customer: ICustomer) =>
    dispatch(CustomerActions.createCustomer(customer)),
  editCustomer: (id: ID, customer: ICustomer) =>
    dispatch(CustomerActions.editCustomer(id, customer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);
