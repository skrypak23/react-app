import React, { FC, FormEvent, MouseEvent } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

const FormItem = Form.Item;

type Props = {
  formFields: Array<{
    label: string;
    key: string;
    placeholder: string;
  }>;
  form: any;
  onSubmit: any
};

const BaseForm: FC<Props> = ({ formFields, form, onSubmit }) => {
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

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(BaseForm);
