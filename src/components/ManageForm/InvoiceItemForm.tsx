import React, { FC, FormEvent } from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import BaseForm from './BaseForm';

type Props = FormComponentProps & {};

const FORM_FIELDS = [
  {
    label: 'Invoice ID',
    key: 'invoice_id',
    placeholder: 'Input Invoice ID'
  },
  {
    label: 'Product ID',
    key: 'product_id',
    placeholder: 'Input Product ID'
  },
  {
    label: 'Quantity',
    key: 'quantity',
    placeholder: 'Input Quantity'
  }
];

const InvoiceItemForm: FC<Props> = props => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.form.validateFields((err: Error, values: any) => {
      console.log('Received values of form: ', values);
    });
  };

  return <BaseForm formFields={FORM_FIELDS} onSubmit={handleSubmit} />;
};

export default InvoiceItemForm;
