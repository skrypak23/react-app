import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InvoiceForm } from '../../components/ManageForm';
import Drawer from '../../components/Drawer';
import Table from '../../components/TableInvoiceItems';
import { ID } from '../../shared/typing/records';
import IInvoiceItem from '../../shared/models/InvoiceItem';
import { Icon } from 'antd';
import ItemsForm from '../../components/ManageForm/InvoiceForm/ItemForm';
import { RootState, RootAction } from '../../redux/store/types';
import { ActionBtn } from '../../components/ManageForm/style';
import ICustomer from '../../shared/models/Customer';
import IProduct from '../../shared/models/Product';
import IInvoice from '../../shared/models/Invoice';
import { InvoiceRequest, InvoiceItemRequest } from '../../redux/request/actions';
import * as InvoiceItemActions from '../../redux/invoice-item/actions';

const { Action: InvoiceAction } = InvoiceRequest;
const { Action: InvoiceItemAction } = InvoiceItemRequest;

type Props = {
  invoice: IInvoice | null;
  invoiceItem: IInvoiceItem | null;
  products: ReadonlyArray<IProduct>;
  customers: ReadonlyArray<ICustomer>;
  invoiceItems: ReadonlyArray<IInvoiceItem>;
  isEdit: boolean;
  setIsEdit: Function;
  resetInvoice: () => void;
  resetInvoiceItems: () => void;
  toggleShowForm: () => void;
  fillItem: (invoiceItem: IInvoiceItem) => void;
  deleteInvoiceItemLocal: (id: ID) => void;
  editInvoiceItemLocal: (id: ID, invoice: IInvoiceItem) => void;
  deleteInvoiceItem: (id: ID, invoiceId: ID) => void;
  addInvoiceItem: (invoiceItem: IInvoiceItem) => void;
  fetchInvoiceItemById: (id: ID, invoiceId: ID) => void;
  editInvoiceItem: (id: ID, invoiceId: ID, invoice: IInvoiceItem) => void;
};
const Edit: FC<Props> = ({
  fillItem,
  editInvoiceItemLocal,
  invoice,
  products,
  toggleShowForm,
  addInvoiceItem,
  isEdit,
  setIsEdit,
  resetInvoice,
  resetInvoiceItems,
  deleteInvoiceItemLocal,
  invoiceItem,
  invoiceItems
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
  const handleDelete = (index: ID) => {
    deleteInvoiceItemLocal(index);
  };

  const handleClickOnEdit = (record: IInvoiceItem, index: ID) => {
    showDrawer();
    setEditItem(true);
    fillItem(invoiceItems[index]);
    setEditIndex(index);
  };

  const handleEditInvoiceItem = (values: IInvoiceItem) => {
    editInvoiceItemLocal(editIndex, { ...invoiceItem, ...values });
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
      <InvoiceForm isEdit={isEdit} products={products} closeForm={handleCloseForm} />
      <Table
        invoiceItems={invoiceItems}
        onDelete={handleDelete}
        onEdit={handleClickOnEdit}
      />
      <Drawer
        title={isEditItem ? 'Edit an invoice item' : 'Create a new invoice item'}
        onClose={closeDrawer}
        visible={visible}
      >
        <ItemsForm
          isEdit={isEditItem}
          invoiceId={invoice ? invoice.id : null}
          invoiceItem={invoiceItem}
          products={products}
          onSubmit={addInvoiceItem}
          onEdit={handleEditInvoiceItem}
        />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  invoice: state.request.invoice.fetchById.data,
  invoiceItem: state.request.invoiceItem.fetchById.data,
  invoiceItems: state.invoiceItem.entities,
  customers: state.customer.entities,
  products: state.product.entities
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  deleteInvoiceItem: (id: ID, invoiceId: ID) =>
    dispatch(InvoiceItemActions.deleteInvoiceItem(id, invoiceId)),
  fetchInvoiceItemById: (id: ID, invoiceId: ID) =>
    dispatch(InvoiceItemActions.fetchInvoiceItem(id, invoiceId)),
  editInvoiceItem: (id: ID, invoiceId: ID, invoice: IInvoiceItem) =>
    dispatch(InvoiceItemActions.editInvoiceItem(id, invoiceId, invoice)),
  deleteInvoiceItemLocal: (id: ID) =>
    dispatch(InvoiceItemActions.deleteInvoiceItemLocal(id)),
  editInvoiceItemLocal: (id: ID, invoice: IInvoiceItem) =>
    dispatch(InvoiceItemActions.editInvoiceItemLocal(id, invoice)),
  resetInvoice: () => dispatch(InvoiceAction.resetInvoice()),
  fillItem: (invoiceItem: IInvoiceItem) =>
    dispatch(InvoiceItemAction.fillItem(invoiceItem)),
  addInvoiceItem: (invoiceItem: IInvoiceItem) =>
    dispatch(InvoiceItemActions.addInvoiceItem(invoiceItem)),
  resetInvoiceItems: () => dispatch(InvoiceItemActions.resetInvoiceItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
