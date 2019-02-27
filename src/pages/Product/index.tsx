import React, { useEffect, useState, FC } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import Table from './Table';
import { ProductForm } from '../../components/ManageForm';
import Drawer from '../../components/Drawer';
import * as ProductActions from '../../redux/product/actions';
import { State } from '../../redux/product/states';
import { RootState, RootAction } from '../../redux/store/types';
import { ID } from '../../shared/typing/records';
import { ActionBtn } from '../../components/ManageForm/style';

type Props = {
  fetchProductById: (id: ID) => any;
  deleteProduct: (id: ID) => any;
  fetchAllProducts: () => any;
  resetProduct: () => any;
  product: State;
};

const Product: FC<Props> = ({
  fetchAllProducts,
  fetchProductById,
  deleteProduct,
  resetProduct,
  product
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
      <Table data={product.products} onEdit={handleEdit} onDelete={deleteProduct} />
      <Drawer title="Create a new product" onClose={handleCloseForm} visible={visible}>
        <ProductForm isEdit={isEdit} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ product: state.product });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      ...ProductActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
