import React, { FC, FormEvent } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import IProduct from '../../../../shared/models/Product';
import { ButtonContainer, StyledButton } from '../../style';

const FormItem = Form.Item;

type Props = {
  formFields: Array<{
    label: string;
    key: string;
    placeholder: string;
    type: string;
    message: string;
  }>;
  form: any;
  formData?: IProduct;
  onSubmit: (product: IProduct) => void;
  isEdit: boolean;
};

const BaseForm: FC<Props> = ({ formFields, form, onSubmit, isEdit }) => {
  const getFields = () => {
    const { getFieldDecorator } = form;
    return formFields.map(({ label, key, placeholder, type, message }) => (
      <Col span={24} key={key}>
        <FormItem label={label}>
          {getFieldDecorator(key, { rules: [{ required: true, message }] })(
            <Input placeholder={placeholder} type={type} />
          )}
        </FormItem>
      </Col>
    ));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.validateFields((err: Error, values: any) => {
      if (!err && Object.values(values).every(Boolean)) {
        onSubmit(values);
        form.resetFields();
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
        <ButtonContainer span={24}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <StyledButton onClick={handleReset} disabled={isEdit} htmlType="button">
            Clear
          </StyledButton>
        </ButtonContainer>
      </Row>
    </Form>
  );
};

export default Form.create({
  mapPropsToFields({ formData = {} as IProduct }: Props) {
    return Object.entries(formData).reduce(
      (values, [key, value]) => ({
        ...values,
        [key]: Form.createFormField({ value })
      }),
      {}
    );
  }
})(BaseForm);
