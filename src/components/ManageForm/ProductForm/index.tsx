import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import IProduct from '../../../shared/models/Product';
import { RootState, RootAction } from '../../../redux/store/types';
import { ID } from '../../../shared/typing/records';
import * as ProductActions from '../../../redux/product/actions';

type Props = {
  editProduct: (id: ID, product: IProduct) => void;
  createProduct: (product: IProduct) => void;
  onClose: () => void;
  product: IProduct | null;
  isEdit: boolean;
};

const FORM_FIELDS = [
  {
    label: 'Name',
    key: 'name',
    placeholder: 'Input name',
    type: 'text',
    message: 'Please input name'
  },
  {
    label: 'Price',
    key: 'price',
    placeholder: 'Input price',
    type: 'number',
    message: 'Please input price'
  }
];

const ProductForm: FC<Props> = ({
  product,
  createProduct,
  editProduct,
  isEdit,
  onClose
}) => {
  const handleSubmit = (values: IProduct) => {
    isEdit ? editProduct(product!.id, { ...values }) : createProduct({ ...values });
    onClose();
  };

  return (
    <BaseForm
      formFields={FORM_FIELDS}
      onSubmit={handleSubmit}
      formData={(product as IProduct) || {}}
      isEdit={isEdit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  product: state.request.product.fetchById.data
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  editProduct: (id: ID, product: IProduct) =>
    dispatch(ProductActions.editProduct(id, product)),
  createProduct: (product: IProduct) => dispatch(ProductActions.createProduct(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);
