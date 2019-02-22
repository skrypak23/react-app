import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BaseForm from './Form';
import IProduct from '../../../models/Product';
import { State } from '../../../reducers/product';
import { RootAction, RootState } from '../../../store/types';
import { ProductActions } from '../../../actions';
import { ID } from '../../../common/types';

type Props = {
  editProduct: (id: ID, product: IProduct) => any;
  createProduct: (product: IProduct) => any;
  product: State;
  isEdit: boolean;
};

const { createProduct, editProduct } = ProductActions;

const FORM_FIELDS = [
  {
    label: 'Name',
    key: 'name',
    placeholder: 'Input name'
  },
  {
    label: 'Price',
    key: 'price',
    placeholder: 'Input price'
  }
];

const ProductForm: FC<Props> = ({ product, createProduct, editProduct, isEdit }) => {
  const handleSubmit = (values: IProduct) => {
    isEdit
      ? editProduct(product.product!.id, { ...values })
      : createProduct({ ...values });
  };

  return (
    <BaseForm
      formFields={FORM_FIELDS}
      onSubmit={handleSubmit}
      formData={(product.product as IProduct) || {}}
      isEdit={isEdit}
    />
  );
};

const mapStateToProps = (state: RootState) => ({ product: state.product });
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  editProduct: (id: ID, product: IProduct) => dispatch(editProduct(id, product)),
  createProduct: (product: IProduct) => dispatch(createProduct(product)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);
