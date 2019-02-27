import React, { FC, MouseEvent } from 'react';
import { Form, Row, Input, Button, Select } from 'antd';
import {ButtonContainer} from '../../style';
import IInvoiceItem from '../../../../shared/models/InvoiceItem';
import IProduct from '../../../../shared/models/Product';
import { ID } from '../../../../shared/typing/records';

const FormItem = Form.Item;
const Option = Select.Option;

type Props = {
  form: any;
  isEdit: boolean;
  invoiceId: ID | null;
  products: ReadonlyArray<IProduct>;
  invoiceItem: IInvoiceItem | null;
  onSubmit: (invoiceItem: IInvoiceItem) => void;
  onEdit: Function;
};

const BaseForm: FC<Props> = ({
  form,
  onSubmit,
  products,
  invoiceId,
  isEdit,
  onEdit
}) => {
  const getFields = () => {
    const { getFieldDecorator } = form;
    return (
      <>
        <FormItem>
          {getFieldDecorator('product_id', {
            rules: [{ required: true, message: 'Please input discount' }]
          })(
            <Select placeholder="Select a product" style={{ width: '100%' }}>
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
        isEdit
          ? onEdit(values)
          : onSubmit({ ...values, invoice_id: invoiceId });
      }
    });
  };

  return (
    <>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <ButtonContainer span={24}>
          <Button type="primary" htmlType="button" onClick={handleSubmit}>
            {isEdit ? 'edit' : 'add'}
          </Button>
        </ButtonContainer>
      </Row>
    </>
  );
};

export default Form.create({
  mapPropsToFields({ invoiceItem }: Props) {
    const data = invoiceItem || {};
    return Object.entries(data).reduce(
      (values, [key, value]) => ({
        ...values,
        [key]: Form.createFormField({ value })
      }),
      {}
    );
  }
})(BaseForm);
