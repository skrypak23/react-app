import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import IProduct from '../../../shared/models/Product';
import { RootState, RootAction } from '../../../redux/store/types';
import { ProductRequest } from '../../../redux/request/actions';
import { ID } from '../../../shared/typing/records';

const { Action } = ProductRequest;

type Props = {
  editProduct: (id: ID, product: IProduct) => void;
  createProduct: (product: IProduct) => void;
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

const ProductForm: FC<Props> = ({ product, createProduct, editProduct, isEdit }) => {
  const handleSubmit = (values: IProduct) => {
    isEdit ? editProduct(product!.id, { ...values }) : createProduct({ ...values });
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

const mapStateToProps = (state: RootState) => ({ product: state.request.product.fetchById.data });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  editProduct: (id: ID, product: IProduct) => dispatch(Action.editProduct(id, product)),
  createProduct: (product: IProduct) => dispatch(Action.createProduct(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);
