import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import ICustomer from '../../models/Customer';

type Props = {
  data: ICustomer[];
  onEdit: Function;
  onDelete: Function
};

const InvoiceTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  const renderColumns = () =>
    [
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
        render: (customer: ICustomer) => (
          <span>
            <a onClick={() => onEdit(customer.id)}>Edit</a>
            <Divider type="vertical" />
            <a onClick={() => onDelete(customer.id)}>Delete</a>
          </span>
        )
      }
    ];

  return (
    <Table
      columns={renderColumns()}
      dataSource={data}
      rowKey={record => `${record.id}`}
    />
  );
};

export default InvoiceTable;
