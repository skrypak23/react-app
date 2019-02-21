import React, {useEffect, useState, FC} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Icon} from 'antd';
import Table from './Table';
import Drawer from '../../components/Drawer';
import {ProductActions} from '../../actions';
import {State} from '../../reducers/product';
import {RootState} from '../../store/types';
import IProduct from '../../models/Product';
import {ProductForm} from '../../components/ManageForm';

const {fetchAllProducts, fetchProductById, resetProduct, deleteProduct} = ProductActions;

type Props = RouteComponentProps<any> & {
    product: State;
    fetchAllProducts: Function;
    fetchProductById: Function;
    resetProduct: Function;
    deleteProduct: Function;
};

const Product: FC<Props> = ({
                                 fetchAllProducts,
                                 fetchProductById,
                                 deleteProduct,
                                 resetProduct,
                                 product
                             }) => {
    const [visible, changeVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const showDrawer = () => changeVisible(true);
    const handleEdit = (id: string | number) => {

        fetchProductById(id);
        showDrawer();
        setIsEdit(true)
    };
    const handleCloseForm = () => {
        changeVisible(false);
        setIsEdit(false);
        resetProduct();
    };

    return (
        <div>
            <Button type="primary" onClick={showDrawer} htmlType="button">
                <Icon type="plus"/> Add Product
            </Button>
            <Table data={product.products as Array<IProduct>} onEdit={handleEdit} onDelete={deleteProduct}/>
            <Drawer title="Create a new product" onClose={handleCloseForm} visible={visible}>
                <ProductForm isEdit={isEdit}/>
            </Drawer>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({product: state.product});
const mapDispatchToProps = {fetchAllProducts, fetchProductById, resetProduct, deleteProduct};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Product));
