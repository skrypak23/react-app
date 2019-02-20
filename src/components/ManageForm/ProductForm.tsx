import React, { FC, FormEvent } from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import BaseForm from './BaseForm';

type Props = FormComponentProps & {};
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

const ProductForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return <BaseForm formFields={FORM_FIELDS} onSubmit={handleSubmit} />;
};

export default ProductForm;
