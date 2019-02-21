import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Table, Divider} from 'antd';
import IInvoice from '../../models/Invoice';

type Props = {
    data: IInvoice[];
    onEdit: Function;
    onDelete: Function
    findName: Function
};

const InvoiceTable: FC<Props> = ({data, onEdit, onDelete, findName}) => {
    const renderColumns = () =>
        [
            {
                title: 'Customer ID',
                dataIndex: 'customer_id',
                key: 'customer_id',
                render: (text: string) => findName(text)
            },
            {
                title: 'Discount',
                dataIndex: 'discount',
                key: 'discount'
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total'
            },
            {
                title: 'Action',
                key: 'action',
                render: (invoice: IInvoice) => (
                    <span>
             <a onClick={() => onEdit(invoice.id)}>Edit</a>
                 <Divider type="vertical"/>
                 <a onClick={() => onDelete(invoice.id)}>Delete</a>
             </span>
                )
            }
        ];
    return (<Table columns={renderColumns()} dataSource={data} rowKey={record => `${record.id}`}/>)
};

export default InvoiceTable;
