import React, { FC, FormEvent } from 'react';
import BaseForm from './BaseForm';

const FORM_FIELDS = [
  {
    label: 'Name',
    key: 'name',
    placeholder: 'Input name'
  },
  {
    label: 'Phone',
    key: 'phone',
    placeholder: 'Input phone'
  },
  {
    label: 'Address',
    key: 'address',
    placeholder: 'Input address'
  }
];

const CustomerForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return <BaseForm formFields={FORM_FIELDS} onSubmit={handleSubmit} />;
};

export default CustomerForm;
