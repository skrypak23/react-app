import React, { useEffect, useState, FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Table from './Table';
import { ProductForm } from '../../components/ManageForm';
import Drawer from '../../components/Drawer';
import { RootState, RootAction } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';
import { ActionBtn } from '../../components/ManageForm/style';
import IProduct from '../../shared/models/Product';
import { ProductRequest } from '../../redux/request/actions';

const { Action } = ProductRequest;

type Props = {
  fetchProductById: (id: ID) => void;
  deleteProduct: (id: ID) => void;
  fetchAllProducts: () => void;
  resetProduct: () => void;
  products: ReadonlyArray<IProduct>;
};

const Product: FC<Props> = ({
  fetchAllProducts,
  fetchProductById,
  deleteProduct,
  resetProduct,
  products
}) => {
  const [visible, changeVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const showDrawer = () => changeVisible(true);
  const handleEdit = (id: number) => {
    fetchProductById(id);
    showDrawer();
    setIsEdit(true);
  };
  const handleCloseForm = () => {
    changeVisible(false);
    setIsEdit(false);
    resetProduct();
  };

  return (
    <div>
      <ActionBtn type="primary" onClick={showDrawer} htmlType="button">
        <Icon type="plus" /> Add Product
      </ActionBtn>
      <Table data={products} onEdit={handleEdit} onDelete={deleteProduct} />
      <Drawer title="Create a new product" onClose={handleCloseForm} visible={visible}>
        <ProductForm isEdit={isEdit} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ products: state.product.entities });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchProductById: (id: ID) => dispatch(Action.fetchProductById(id)),
  deleteProduct: (id: ID) => dispatch(Action.deleteProduct(id)),
  fetchAllProducts: () => dispatch(Action.fetchAllProducts()),
  resetProduct: () => dispatch(Action.resetProduct()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
