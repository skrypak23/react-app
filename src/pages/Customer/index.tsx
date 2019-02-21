import React, {useEffect, useState, FC} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Icon} from 'antd';
import Table from './Table';
import Drawer from '../../components/Drawer';
import {CustomerActions} from '../../actions';
import {State} from '../../reducers/customer';
import {RootState} from '../../store/types';
import ICustomer from '../../models/Customer';
import {CustomerForm} from '../../components/ManageForm';

const {fetchAllCustomers, fetchCustomerById, resetCustomer, deleteCustomer} = CustomerActions;

type Props = RouteComponentProps<any> & {
    customer: State;
    fetchAllCustomers: Function;
    fetchCustomerById: Function;
    resetCustomer: Function;
    deleteCustomer: Function;
};

const Customer: FC<Props> = ({
                                 fetchAllCustomers,
                                 fetchCustomerById,
                                 deleteCustomer,
                                 resetCustomer,
                                 customer
                             }) => {
    const [visible, changeVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    const showDrawer = () => changeVisible(true);
    const handleEdit = (id: string | number) => {
        fetchCustomerById(id);
        showDrawer();
        setIsEdit(true)
    };
    const handleCloseForm = () => {
        changeVisible(false);
        setIsEdit(false);
        resetCustomer();
    };

    return (
        <div>
            <Button type="primary" onClick={showDrawer} htmlType="button">
                <Icon type="plus"/> Add Customer
            </Button>
            <Table data={customer.customers as Array<ICustomer>} onEdit={handleEdit} onDelete={deleteCustomer}/>
            <Drawer title="Create a new customer" onClose={handleCloseForm} visible={visible}>
                <CustomerForm isEdit={isEdit}/>
            </Drawer>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({customer: state.customer});
const mapDispatchToProps = {fetchAllCustomers, fetchCustomerById, resetCustomer, deleteCustomer};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Customer));
