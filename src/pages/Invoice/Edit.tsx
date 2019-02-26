import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { InvoiceForm } from '../../components/ManageForm';
import Drawer from '../../components/Drawer';
import Table from '../../components/TableInvoiceItems';
import { ID } from '../../shared/typing/records';
import IInvoiceItem from '../../shared/models/InvoiceItem';
import IInvoice from '../../shared/models/Invoice';
import { Button, Icon } from 'antd';
import ItemsForm from '../../components/ManageForm/InvoiceForm/ItemForm';
import { RootAction, RootState } from '../../redux/store/types';
import { State as CustomerState } from '../../redux/customer/states';
import { State as InvoiceItemsState } from '../../redux/invoice-item/states';
import { State as ProductState } from '../../redux/product/states';
import { State as InvoiceState } from '../../redux/invoice/states';
import * as CustomerActions from '../../redux/customer/actions';
import * as InvoiceActions from '../../redux/invoice/actions';
import * as InvoiceItemActions from '../../redux/invoice-item/actions';

type Props = {
  fetchAllCustomers: () => any;
  fillInvoice: (invoice: IInvoice) => any;
  addInvoiceItem: (invoiceItem: IInvoiceItem) => any;
  invoice: InvoiceState;
  product: ProductState;
  customer: CustomerState;
  invoiceItem: InvoiceItemsState;
  toggleShowForm: () => any;
  isEdit: boolean;
  setIsEdit: Function;
  resetInvoice: () => any;
  deleteInvoiceItem: (id: ID, invoiceId: ID) => any;
  deleteInvoiceItemLocal: (id: ID) => any;
  fetchInvoiceItemById: (id: ID, invoiceId: ID) => any;
  editInvoiceItem: (id: ID, invoiceId: ID, invoice: IInvoiceItem) => any;
};
const Edit: FC<Props> = ({
  fetchAllCustomers,
  fillInvoice,
  invoice,
  product,
  customer,
  toggleShowForm,
  addInvoiceItem,
  isEdit,
  setIsEdit,
  resetInvoice,
  deleteInvoiceItem,
  deleteInvoiceItemLocal,
  fetchInvoiceItemById,
  invoiceItem,
  editInvoiceItem
}) => {
  const [visible, changeVisible] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const showDrawer = () => changeVisible(!visible);

  const handleCloseForm = () => {
    changeVisible(false);
    toggleShowForm();
    setIsEdit(false);
    resetInvoice();
  };
  const handleDelete = (index: ID, invoiceItem: IInvoiceItem) => {
    console.log(index, invoiceItem);
    if (invoiceItem.id) {
      deleteInvoiceItem(invoiceItem.id, invoiceItem.invoice_id);
    } else {
      deleteInvoiceItemLocal(index);
    }
  };

  const handleClickOnEdit = (record: IInvoiceItem, index: ID) => {
    showDrawer();
    setIsEditItem(true);
    if (record.id) {
      fetchInvoiceItemById(record.id, invoice.invoice!.id);
    }
  };

  const handleEditInvoiceItem = (values: IInvoiceItem) => {
    if (invoiceItem.invoiceItem!.id) { editInvoiceItem(invoiceItem.invoiceItem!.id, invoice.invoice!.id, values); }
    else {

    }
  };

  const closeDrawer = () => {
    showDrawer();
    setIsEditItem(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer} htmlType="button">
        <Icon type="plus" /> Add Invoice Item
      </Button>
      <InvoiceForm
        isEdit={isEdit}
        customers={customer.customers}
        products={product.products}
        closeForm={handleCloseForm}
      />
      <Table
        invoiceItems={invoiceItem.invoiceItems}
        onDelete={handleDelete}
        onEdit={handleClickOnEdit}
      />
      <Drawer
        title="Create a new invoice"
        onClose={closeDrawer}
        visible={visible}
      >
        <ItemsForm
          isEdit={isEditItem}
          invoiceId={invoice.invoice ? invoice.invoice.id : null}
          invoiceItem={invoiceItem.invoiceItem}
          products={product.products}
          onSubmit={addInvoiceItem}
          onEdit={handleEditInvoiceItem}
        />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.invoice,
  invoiceItem: state.invoiceItem,
  customer: state.customer,
  product: state.product
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      ...CustomerActions,
      ...InvoiceActions,
      ...InvoiceItemActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
