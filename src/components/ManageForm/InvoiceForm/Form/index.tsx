import React, { FC, FormEvent } from 'react';
import { Form, Row, Col, Input, Button, Select, Collapse, Statistic } from 'antd';
import IInvoice from '../../../../models/Invoice';
import ICustomer from '../../../../models/Customer';
import IProduct from '../../../../models/Product';
import Table from '../../../TableInvoiceItems';
import ItemsForm from '../ItemForm';
import IInvoiceItem from '../../../../models/InvoiceItem';
import { ID } from '../../../../common/types';

type Props = {
  form: any;
  onSubmit: (values: any) => void;
  isEdit: boolean;
  customer: ICustomer | null;
  customers: ICustomer[];
  invoice: IInvoice | null;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  products: ReadonlyArray<IProduct>;
  handleCreateInvoiceItem: (id: ID, invoiceItem: IInvoiceItem) => any;
  handleDelete: (index: ID, invoiceItem: IInvoiceItem) => any;
};

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;

const BaseForm: FC<Props> = ({
  form,
  onSubmit,
  isEdit,
  customers,
  products,
  invoice,
  handleDelete,
  invoiceItems,
  handleCreateInvoiceItem
}) => {
  const { getFieldDecorator } = form;

  const getFields = () => (
    <Col span={24}>
      <FormItem>
        {getFieldDecorator('customer_id', {
          rules: [{ required: true, message: 'Please select customer' }]
        })(
          <Select placeholder='Select a customer'>
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
          })(<Input placeholder='Input discount' type='number' step={0.01} min={0} />)}
        </FormItem>
        <Statistic
          title='Total'
          value={11.28}
          precision={1}
          valueStyle={{ color: '#3f8600' }}
          suffix='$'
        />
      </Row>
      <Collapse>
        <Panel header='Add Invoice Item' key='1'>
          <ItemsForm
            invoiceId={invoice ? invoice.id : ''}
            products={products}
            onSubmit={handleCreateInvoiceItem}
          />
        </Panel>
      </Collapse>
      <Table invoiceItems={invoiceItems} onDelete={handleDelete} />
    </Col>
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.validateFields((err: Error, values: any) => {
      console.log(values);
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
          <FormItem>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={handleReset}
              disabled={isEdit}
              htmlType='button'
            >
              Clear
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create({
  mapPropsToFields({ invoice, customer }: Props) {
    return {
      customer_id: Form.createFormField({ value: customer && customer.id }),
      discount: Form.createFormField({ value: invoice && invoice.discount }),
      total: Form.createFormField({ value: invoice && invoice.total })
    };
  }
})(BaseForm);
