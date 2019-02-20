import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import ICustomer from '../../models/Customer';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <Link to="javascript:;">{text}</Link>
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
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
  data: ICustomer[];
};

const InvoiceTable: FC<Props> = ({ data }) => (
  <Table columns={columns} dataSource={data} rowKey={record => `${record.id}`} />
);

export default InvoiceTable;
