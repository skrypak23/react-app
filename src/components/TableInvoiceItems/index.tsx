import React, { FC } from 'react';
import { Table, Divider, Collapse } from 'antd';
import IInvoiceItem from '../../shared/models/InvoiceItem';
import { ID } from '../../shared/typing/records';

const Panel = Collapse.Panel;

type Props = {
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  onDelete: (index: ID, invoiceItem: IInvoiceItem) => any;
  onEdit: (record: IInvoiceItem, index: ID) => any;
};

const ItemsTable: FC<Props> = ({ invoiceItems, onDelete, onEdit }) => {
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
          <a onClick={() => onEdit(record, id)}>Edit</a>
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
