import React, {FC} from 'react';
import {connect} from 'react-redux';
import BaseForm from './Form';
import ICustomer from '../../../models/Customer';
import {CustomerActions} from '../../../actions';
import {RootState} from '../../../store/types';
import {State} from '../../../reducers/customer';

const {createCustomer, editCustomer} = CustomerActions;

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
    createCustomer: Function;
    editCustomer: Function;
    customer: State;
    isEdit: boolean;
};

const CustomerForm: FC<Props> = ({customer, createCustomer, editCustomer, isEdit}) => {
    const handleSubmit = (values: ICustomer) => {
        isEdit ? editCustomer(customer.customer!.id, {...values}) : createCustomer({...values});
    };

    return (
        <BaseForm
            formFields={FORM_FIELDS}
            onSubmit={handleSubmit}
            formData={customer.customer as ICustomer || {}}
            isEdit={isEdit}
        />
    );
};

const mapStateToProps = (state: RootState) => ({customer: state.customer});
const mapDispatchToProps = {createCustomer, editCustomer};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerForm);
