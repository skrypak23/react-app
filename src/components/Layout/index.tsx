import React, { FC } from 'react';
import { Layout as AntLayout, Icon } from 'antd';
const { Header, Content, Sider } = AntLayout;
import Menu from './Menu';
import styles from './style';
import * as PATHS from '../../routes/routes';

const MENU_ITEMS = [
  { to: PATHS.CUSTOMER, name: 'Customers' },
  { to: PATHS.PRODUCT, name: 'Products' },
  { to: PATHS.INVOICE, name: 'Invoices' }
];

const Layout: FC = ({ children }) => {
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
