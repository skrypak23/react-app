import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';
import IProduct from '../../models/Product';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <Link to="javascript:;">{text}</Link>
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
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
  data: IProduct[];
};

const ProductTable: FC<Props> = ({ data }) => (
  <Table columns={columns} dataSource={data} rowKey={record => `${record.id}`} />
);

export default ProductTable;
