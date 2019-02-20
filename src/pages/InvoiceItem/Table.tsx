import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import IInvoiceItem from '../../models/InvoiceItem';

const columns = [
  {
    title: 'Invoice ID',
    dataIndex: 'invoice_id',
    key: 'customer_id',
    render: (text: string) => <Link to="javascript:;">{text}</Link>
  },
  {
    title: 'Product ID',
    dataIndex: 'product_id',
    key: 'product_id'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
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
  data: IInvoiceItem[];
};

const InvoiceTable: FC<Props> = ({ data }) => (
  <Table columns={columns} dataSource={data} rowKey={record => `${record.id}`} />
);

export default InvoiceTable;
