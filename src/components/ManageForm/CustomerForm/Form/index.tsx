import React, { FC, FormEvent } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import ICustomer from '../../../../shared/models/Customer';

const FormItem = Form.Item;

type Props = {
  formFields: Array<{
    label: string;
    key: string;
    placeholder: string;
  }>;
  form: any;
  formData?: ICustomer | null;
  onSubmit: (customer: ICustomer) => void;
  isEdit: boolean;
};

const BaseForm: FC<Props> = ({ formFields, form, onSubmit, isEdit }) => {
  const getFields = () => {
    const { getFieldDecorator } = form;
    return formFields.map(({ label, key, placeholder }) => (
      <Col span={24} key={key}>
        <FormItem label={label}>
          {getFieldDecorator(key)(<Input placeholder={placeholder} />)}
        </FormItem>
      </Col>
    ));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.validateFields((err: Error, values: any) => {
      if (!err && Object.values(values).every(Boolean)) {
        onSubmit(values);
      }
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={handleReset}
            disabled={isEdit}
            htmlType="button"
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create({
  mapPropsToFields({ formData }: Props) {
    return Object.entries(formData || {}).reduce(
      (values, [key, value]) => ({
        ...values,
        [key]: Form.createFormField({ value })
      }),
      {}
    );
  }
})(BaseForm);
