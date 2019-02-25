import React, { FC } from 'react';
import { Table, Divider, Collapse } from 'antd';
import IInvoiceItem from '../../shared/models/InvoiceItem';
import { ID } from '../../shared/typing/records';

const Panel = Collapse.Panel;

type Props = {
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  onDelete: (index: ID, invoiceItem: IInvoiceItem) => any;
};

const data = [
  {
    key: '1',
    invoice_id: 1,
    product_id: 32,
    quantity: 100
  },
  {
    key: '2',
    invoice_id: 1,
    product_id: 42,
    quantity: 200
  },
  {
    key: '3',
    invoice_id: 3,
    product_id: 32,
    quantity: 300
  }
];

const ItemsTable: FC<Props> = ({ invoiceItems, onDelete }) => {
  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: 'invoice_id',
      key: 'invoice_id',
      render: (text: string) => <a>{text}</a>
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
      render: (text: string, record: any, id: ID) => (
        <span>
          <a>Edit</a>
          <Divider type='vertical' />
          <a onClick={() => onDelete(id, record)}>Delete</a>
        </span>
      )
    }
  ];
  return (
    <Collapse>
      <Panel header='Show Invoice Items' key='1'>
        <Table
          columns={columns}
          dataSource={invoiceItems as IInvoiceItem[]}
          rowKey={(_, idx) => `${idx}`}
        />
      </Panel>
    </Collapse>
  );
};

export default ItemsTable;
