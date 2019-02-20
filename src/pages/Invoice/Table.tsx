import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import IInvoice from '../../models/Invoice';

const columns = [
  {
    title: 'Customer ID',
    dataIndex: 'customer_id',
    key: 'customer_id',
    render: (text: string) => <Link to="javascript:;">{text}</Link>
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
    render: () => (
      <span>
        <Link to="javascript:;">Edit</Link>
        <Divider type="vertical" />
        <Link to="javascript:;">Delete</Link>
      </span>
    )
  }
];

type Props = {
  data: IInvoice[];
};

const InvoiceTable: FC<Props> = ({ data }) => (
  <Table columns={columns} dataSource={data} rowKey={record => `${record.id}`} />
);

export default InvoiceTable;
