import React, { FC, MouseEvent } from 'react';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import IInvoiceItem from '../../../../shared/models/InvoiceItem';
import IProduct from '../../../../shared/models/Product';
import { ID } from '../../../../shared/typing/records';

const FormItem = Form.Item;
const Option = Select.Option;

type Props = {
  form: any;
  invoiceId: ID;
  formData?: IInvoiceItem;
  products: ReadonlyArray<IProduct>;
  onSubmit: (invoiceItem: IInvoiceItem) => void;
};

const BaseForm: FC<Props> = ({ form, onSubmit, products, invoiceId }) => {
  const getFields = () => {
    const { getFieldDecorator } = form;
    return (
      <>
        <FormItem>
          {getFieldDecorator('product_id', {
            rules: [{ required: true, message: 'Please input discount' }]
          })(
            <Select placeholder="Select a product">
              {products.map((product: IProduct) => (
                <Option key={`${product.id}`} value={product.id}>
                  {product.name} - {product.price}$
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('quantity', {
            rules: [{ required: true, message: 'Please input quantity' }]
          })(<Input placeholder="Input quantity" type="number" min={1} />)}
        </FormItem>
      </>
    );
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    form.validateFields((err: Error, values: any) => {
      if (!err && Object.values(values).every(Boolean)) {
        onSubmit({ ...values, invoice_id: invoiceId });
      }
    });
  };

  return (
    <>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="button" onClick={handleSubmit}>
            add
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Form.create({
  mapPropsToFields({ formData = {} as IInvoiceItem }: Props) {
    return Object.entries(formData).reduce(
      (values, [key, value]) => ({
        ...values,
        [key]: Form.createFormField({ value })
      }),
      {}
    );
  }
})(BaseForm);
