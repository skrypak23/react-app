import React, { FC, ReactNode, useState } from 'react';
import { Layout as AntLayout, Icon } from 'antd';
const { Header, Content, Sider } = AntLayout;
import Menu from './Menu';
import styles from './style';
import * as PATHS from '../../routes/routes';

type Props = {
  children: ReactNode;
};

const MENU_ITEMS = [
  { to: PATHS.CUSTOMER, name: 'Customers' },
  { to: PATHS.PRODUCT, name: 'Products' },
  { to: PATHS.INVOICE, name: 'Invoices' },
  { to: PATHS.INVOICE_ITEM, name: 'Invoice Items' }
];

const Layout: FC<Props> = ({ children }) => {
  return (
    <AntLayout>
      <Sider trigger={null}>
        <Menu menuItems={MENU_ITEMS} />
      </Sider>
      <AntLayout className="layout">
        <Header style={styles.header} />
        <Content style={styles.content}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
