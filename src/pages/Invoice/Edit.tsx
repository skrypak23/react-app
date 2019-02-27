import React, { FC, useState, useEffect } from 'react';
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
import { ActionBtn } from '../../components/ManageForm/style';

type Props = {
  addInvoiceItem: (invoiceItem: IInvoiceItem) => any;
  invoice: InvoiceState;
  product: ProductState;
  customer: CustomerState;
  invoiceItem: InvoiceItemsState;
  toggleShowForm: () => void;
  isEdit: boolean;
  setIsEdit: Function;
  fillItem: (idx: ID) => void;
  resetInvoice: () => void;
  deleteInvoiceItem: (id: ID, invoiceId: ID) => void;
  deleteInvoiceItemLocal: (id: ID) => void;
  fetchInvoiceItemById: (id: ID, invoiceId: ID) => void;
  editInvoiceItem: (id: ID, invoiceId: ID, invoice: IInvoiceItem) => void;
  editInvoiceItemLocal: (id: ID, invoice: IInvoiceItem) => void;
  resetInvoiceItem: () => void;
};
const Edit: FC<Props> = ({
  fillItem,
  editInvoiceItemLocal,
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
  editInvoiceItem,
  resetInvoiceItem
}) => {
  const [visible, changeVisible] = useState(false);
  const [isEditItem, setEditItem] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const showDrawer = () => changeVisible(!visible);

  const handleCloseForm = () => {
    changeVisible(false);
    toggleShowForm();
    setIsEdit(false);
    resetInvoice();
  };
  const handleDelete = (index: ID, invoiceItem: IInvoiceItem) => {
    if (invoiceItem.id) {
      deleteInvoiceItem(invoiceItem.id, invoiceItem.invoice_id);
    } else {
      deleteInvoiceItemLocal(index);
    }
  };

  const handleClickOnEdit = (record: IInvoiceItem, index: ID) => {
    showDrawer();
    setEditItem(true);
    if (record.id) {
      fetchInvoiceItemById(record.id, invoice.invoice!.id);
    } else {
      fillItem(index);
      setEditIndex(index);
    }
  };

  const handleEditInvoiceItem = (values: IInvoiceItem) => {
    if (invoiceItem.invoiceItem!.id) {
      editInvoiceItem(invoiceItem.invoiceItem!.id, invoice.invoice!.id, values);
    } else {
      editInvoiceItemLocal(editIndex, values);
    }
    closeDrawer();
  };

  const closeDrawer = () => {
    showDrawer();
    setEditItem(false);
  };

  return (
    <div>
      <ActionBtn type="primary" onClick={showDrawer} htmlType="button">
        <Icon type="plus" /> Add Invoice Item
      </ActionBtn>
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
