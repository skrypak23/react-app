import React, { FC, FormEvent } from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import BaseForm from '../BaseForm';

type Props = FormComponentProps & {};

const FORM_FIELDS = [
  {
    label: 'Customer ID',
    key: 'customer_id',
    placeholder: 'Input Customer ID'
  },
  {
    label: 'Discount',
    key: 'discount',
    placeholder: 'Input discount'
  },
  {
    label: 'Total',
    key: 'total',
    placeholder: 'Input total'
  }
];

const InvoiceForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return <BaseForm formFields={FORM_FIELDS} onSubmit={handleSubmit} />;
};

export default InvoiceForm;
