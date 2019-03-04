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
import * as ProductActions from '../../redux/product/actions';
import withToast from '../../hoc/withToast';

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

  const handleEdit = (id: ID) => {
    fetchProductById(id);
    setIsEdit(true);
    showDrawer();
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
      <Drawer
        title={isEdit ? 'Edit the product' : 'Create a new product'}
        onClose={handleCloseForm}
        visible={visible}
      >
        <ProductForm isEdit={isEdit} onClose={handleCloseForm} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ products: state.product.entities });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  fetchProductById: (id: ID) => dispatch(ProductActions.fetchProduct(id)),
  deleteProduct: (id: ID) => dispatch(ProductActions.deleteProduct(id)),
  fetchAllProducts: () => dispatch(ProductActions.fetchProducts()),
  resetProduct: () => dispatch(ProductActions.resetProductLocal())
});

export default withToast(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Product)
);
