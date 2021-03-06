import React, { FC, FormEvent, ChangeEvent } from 'react';
import { Form, Row, Col, Input, Button, Select, Statistic } from 'antd';
import { ButtonContainer, StyledButton } from '../../style';
import IInvoice from '../../../../shared/models/Invoice';
import ICustomer from '../../../../shared/models/Customer';
import IProduct from '../../../../shared/models/Product';
import IInvoiceItem from '../../../../shared/models/InvoiceItem';
import { ID } from '../../../../shared/typing/records';

type Props = {
  form: any;
  onSubmit: (values: any) => void;
  fillInvoice: (invoice: IInvoice) => void;
  isEdit: boolean;
  customer: ICustomer | null;
  customers: ReadonlyArray<ICustomer>;
  invoice: IInvoice | null;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  products: ReadonlyArray<IProduct>;
  handleDelete: (index: ID) => void;
  closeForm: () => void;
};

const FormItem = Form.Item;
const Option = Select.Option;

const BaseForm: FC<Props> = ({
  form,
  onSubmit,
  isEdit,
  customers,
  products,
  invoice,
  handleDelete,
  invoiceItems,
  fillInvoice,
  closeForm
}) => {
  const { getFieldDecorator } = form;
  const total = invoice && invoice.total ? invoice.total : 0;

  const getFields = () => (
    <Col span={24}>
      <FormItem>
        {getFieldDecorator('customer_id', {
          rules: [{ required: true, message: 'Please select customer' }]
        })(
          <Select placeholder="Select a customer">
            {customers.map((customer: ICustomer) => (
              <Option key={`${customer.id}`} value={customer.id}>
                {customer.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
      <Row>
        <FormItem>
          {getFieldDecorator('discount', {
            rules: [{ required: true, message: 'Please input discount' }]
          })(
            <Input
              placeholder="Input discount"
              type="number"
              step={0.1}
              min={0}
              max={100}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const id = invoice ? invoice.id : null;
                fillInvoice({
                  ...form.getFieldsValue(),
                  discount: event.target.value,
                  id
                } as IInvoice);
              }}
            />
          )}
        </FormItem>
        <Statistic
          title="Total"
          value={total}
          precision={1}
          valueStyle={{ color: '#3f8600' }}
          suffix="$"
        />
      </Row>
    </Col>
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.validateFields((err: Error, values: any) => {
      if (!err && Object.values(values).every(Boolean)) {
        const id = invoice ? invoice.id : null;
        onSubmit({ ...values, id, total: total.toFixed(2) });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <ButtonContainer span={24}>
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={!invoiceItems.length}>
              Submit
            </Button>
            <StyledButton onClick={closeForm} htmlType="button">
              Close
            </StyledButton>
          </FormItem>
        </ButtonContainer>
      </Row>
    </Form>
  );
};

export default Form.create({
  mapPropsToFields({ isEdit, invoice, customer }: Props) {
    return {
      customer_id: Form.createFormField({ value: customer && customer.id }),
      discount: Form.createFormField({ value: invoice && invoice.discount }),
      total: Form.createFormField({ value: invoice && invoice.total })
    };
  }
})(BaseForm);
