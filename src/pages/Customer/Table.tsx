import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import ICustomer from '../../shared/models/Customer';
import { ID, RecordAction } from '../../shared/typing/records';

type Props = RecordAction & {
  data: ReadonlyArray<ICustomer>;
};

const InvoiceTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  const renderColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>
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
      dataSource={data as ICustomer[]}
      rowKey={(record, id) => `${record.id}-${id}`}
    />
  );
};

export default InvoiceTable;
