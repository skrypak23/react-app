import React, { FC, ReactNode } from 'react';
import { Layout as AntLayout } from 'antd';
const { Header, Content } = AntLayout;
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

const Layout: FC<Props> = ({ children }) => (
  <AntLayout className="layout">
    <Header>
      <Menu menuItems={MENU_ITEMS} />
    </Header>
    <Content style={styles.container}>
      <div style={styles.content}>{children}</div>
    </Content>
  </AntLayout>
);

export default Layout;
