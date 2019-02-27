import React, { FC } from 'react';
import { Table, Divider } from 'antd';
import IInvoice from '../../shared/models/Invoice';
import { RecordAction, ID } from '../../shared/typing/records';

type Props = RecordAction & {
  data: ReadonlyArray<IInvoice>;
  findCustomerName: (id: ID) => string;
};

const InvoiceTable: FC<Props> = ({ data, onEdit, onDelete, findCustomerName }) => {
  const renderColumns = () => [
    {
      title: 'Customer name',
      dataIndex: 'customer_id',
      key: 'customer_id',
      render: (customerId: number) => findCustomerName(customerId)
    },
    {
      title: 'Discount %',
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
          <Divider type="vertical" />
          <a onClick={() => onDelete(invoice.id)}>Delete</a>
        </span>
      )
    }
  ];
  return (
    <Table
      columns={renderColumns()}
      dataSource={data as IInvoice[]}
      rowKey={(record, idx) => `${record.id}${idx}`}
    />
  );
};

export default InvoiceTable;
