import React, { useEffect, FC, useState } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { ProductForm } from '../../components/ManageForm';
import { ProductActions } from '../../actions';
import { State } from '../../reducers/product';
import { RootState } from '../../store/types';
import IProduct from '../../models/Product';
import Drawer from '../../components/Drawer';

const { fetchAllProducts } = ProductActions;

type Props = {
  product: State;
  fetchAllProducts: Function;
};

const Product: FC<Props> = props => {
  const { product } = props;
  const [visible, changeVisible] = useState(false);
  const [isEdit, setMode] = useState(false);
  useEffect(() => {
    props.fetchAllProducts();
  }, []);

  const onClose = () => changeVisible(false);
  const showDrawer = () => changeVisible(true);

  return (
    <div>
      <Table data={product.products as Array<IProduct>} />
      <Drawer title="Create a new customer" onClose={onClose} visible={visible}>
        {isEdit ? null : <ProductForm />}
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ product: state.product });
const mapDispatchToProps = { fetchAllProducts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
