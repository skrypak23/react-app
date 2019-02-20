import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { ProductActions } from '../../actions';
import { State } from '../../reducers/product';
import { RootState } from '../../store/types';
import IProduct from '../../models/Product';

const { fetchProducts } = ProductActions;

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
      <Table data={product.products as Array<IProduct>} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ product: state.product });
const mapDispatchToProps = { fetchProducts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
