import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import IProduct from '../../shared/models/Product';
import { RecordAction } from '../../shared/typing/records';

type Props = RecordAction & {
  data: ReadonlyArray<IProduct>;
};

const ProductTable: FC<Props> = ({ data, onEdit, onDelete }) => {
  const renderColumns = () => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Action',
      key: 'action',
      render: (product: IProduct) => (
        <span>
          <a onClick={() => onEdit(product.id)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(product.id)}>Delete</a>
        </span>
      )
    }
  ];

  return (
    <Table
      columns={renderColumns()}
      dataSource={data as IProduct[]}
      rowKey={record => `${record.id}`}
    />
  );
};

export default ProductTable;
