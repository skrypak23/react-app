import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import ICustomer from '../../../shared/models/Customer';
import { CustomerActions } from '../../../actions';
import { RootAction, RootState } from '../../../redux/store/types';
import { State } from '../../../reducers/customer';
import { ID } from '../../../common/types';

const { createCustomer, editCustomer } = CustomerActions;

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
      formData={(customer.customer as ICustomer) || {}}
      isEdit={isEdit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({ customer: state.customer });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  createCustomer: (customer: ICustomer) => dispatch(createCustomer(customer)),
  editCustomer: (id: ID, customer: ICustomer) => dispatch(editCustomer(id, customer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);
