import React, { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Divider } from 'antd';
import { ProductActions } from '../../actions';
import { State } from '../../reducers/product';
import { RootState } from '../../store/types';
import IProduct from '../../models/Product';

const { fetchProducts } = ProductActions;

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
  product: State;
  fetchProducts: Function;
};

const Product: FC<Props> = props => {
  const { product } = props;
  useEffect(() => {
    props.fetchProducts();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={product.products as Array<IProduct>}
        rowKey={record => `${record.id}`}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ product: state.product });
const mapDispatchToProps = { fetchProducts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
