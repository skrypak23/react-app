import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import IInvoiceItem from '../../shared/models/InvoiceItem';
import { RecordAction } from '../../common/types';

type Props = RecordAction & {
  data: ReadonlyArray<IInvoiceItem>;
};

const InvoiceItemTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  const renderColumns = () => [
    {
      title: 'Invoice ID',
      dataIndex: 'invoice_id',
      key: 'invoice_id',
      render: (text: string) => <Link to="javascript:;">{text}</Link>
    },
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id'
    },{
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Action',
      key: 'action',
      render: (invoiceItem: IInvoiceItem) => (
          <span>
          <a onClick={() => onEdit(invoiceItem.id)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(invoiceItem.id)}>Delete</a>
        </span>
      )
    }
  ];

  return (
      <Table
          columns={renderColumns()}
          dataSource={data as IInvoiceItem[]}
          rowKey={record => `${record.id}`}
      />
  );
};

export default InvoiceItemTable;
