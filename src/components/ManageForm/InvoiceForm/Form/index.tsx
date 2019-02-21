import React, {FC, FormEvent} from 'react';
import {Form, Row, Col, Input, Button, Select} from 'antd';
import IInvoice from "../../../../models/Invoice";
import ICustomer from "../../../../models/Customer";


type Props = {
    formFields: Array<{
        label: string;
        key: string;
        placeholder: string;
    }>;
    form: any;
    formData?: any;
    onSubmit: Function;
    isEdit: boolean;
    customers: ICustomer[]
    customer: ICustomer
};

const FormItem = Form.Item;
const Option = Select.Option;

const BaseForm: FC<Props> = ({formFields, form, onSubmit, isEdit, customers}) => {
    const {getFieldDecorator} = form;
    // const getFields = () => {
    //     const {getFieldDecorator} = form;
    //     return formFields.map(({label, key, placeholder}) => (
    //         <Col span={24} key={key}>
    //             <FormItem label={label}>
    //                 {getFieldDecorator(key)(<Input placeholder={placeholder}/>)}
    //             </FormItem>
    //         </Col>
    //     ));
    // };

    const getFields = () => (
        <Col span={24}>
            <FormItem>
                {
                    getFieldDecorator('customer_id', {
                        rules: [{required: true, message: 'Please select customer'}]
                    })(
                        <Select>
                            {customers.map((customer: ICustomer) => <Option key={`${customer.id}`}
                                                                            value={customer.id}>{customer.name}</Option>)}
                        </Select>)
                }
            </FormItem>
            <FormItem>
                {
                    getFieldDecorator('discount', {
                        rules: [{required: true, message: 'Please input discount'}]
                    })(<Input placeholder="Input discount" type="number" step={0.01} min={0}/>)
                }
            </FormItem>
            <FormItem>
                {
                    getFieldDecorator('total', {
                        rules: [{required: true, message: 'Please input total'}]
                    })(<Input placeholder="Input discount" type="number" step={0.01} min={0}/>)
                }
            </FormItem>
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
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button style={{marginLeft: 8}} onClick={handleReset} disabled={isEdit} htmlType="button">
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Form.create({
    mapPropsToFields({formData = {} as IInvoice, customer}: Props) {
        return {
            customer_id: Form.createFormField({value: customer && customer.id}),
            discount: Form.createFormField({value: formData.discount}),
            total: Form.createFormField({value: formData.total}),
        }
    }
})(BaseForm);
