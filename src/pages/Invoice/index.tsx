import React, {useEffect, useState, FC} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Icon} from 'antd';
import Table from './Table';
import Drawer from '../../components/Drawer';
import {InvoiceActions, CustomerActions} from '../../actions';
import {State} from '../../reducers/invoice';
import {State as CustomerState} from '../../reducers/customer';
import {RootState} from '../../store/types';
import IInvoice from '../../models/Invoice';
import {InvoiceForm} from '../../components/ManageForm';

const {fetchAllInvoices, fetchInvoiceById, resetInvoice, deleteInvoice} = InvoiceActions;
const {fetchAllCustomers} = CustomerActions;

type Props = RouteComponentProps<any> & {
    invoice: State;
    customer: CustomerState;
    fetchAllInvoices: Function;
    fetchInvoiceById: Function;
    resetInvoice: Function;
    deleteInvoice: Function;
    fetchAllCustomers: Function;
};

const Invoice: FC<Props> = ({
                                fetchAllInvoices,
                                fetchAllCustomers,
                                fetchInvoiceById,
                                deleteInvoice,
                                resetInvoice,
                                invoice,
                                customer
                            }) => {
    const [visible, changeVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchAllInvoices();
        fetchAllCustomers();
    }, []);

    const showDrawer = () => changeVisible(true);
    const handleEdit = (id: string | number) => {

        fetchInvoiceById(id);
        showDrawer();
        setIsEdit(true)
    };
    const handleCloseForm = () => {
        changeVisible(false);
        setIsEdit(false);
        resetInvoice();
    };

    const findName = (id: number): string => {
        const foundCustomer = customer.customers.find(customer => customer.id === id);
        return foundCustomer ? foundCustomer.name : '';
    };

    return (
        <div>
            <Button type="primary" onClick={showDrawer} htmlType="button">
                <Icon type="plus"/> Add Invoice
            </Button>
            <Table data={invoice.invoices as IInvoice[]} onEdit={handleEdit} onDelete={deleteInvoice} findName={findName}/>
            <Drawer title="Create a new invoice" onClose={handleCloseForm} visible={visible}>
                <InvoiceForm isEdit={isEdit}/>
            </Drawer>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({invoice: state.invoice, customer: state.customer});
const mapDispatchToProps = {fetchAllInvoices, fetchInvoiceById, resetInvoice, deleteInvoice, fetchAllCustomers};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Invoice));
