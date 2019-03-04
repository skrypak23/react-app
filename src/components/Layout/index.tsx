import React, { FC } from 'react';
import { Layout as AntLayout } from 'antd';
const { Sider } = AntLayout;
import Menu from './Menu';
import { StyledContent, StyledHeader } from './style';
import * as PATHS from '../../routes/routes';
import ErrorBoundary from '../ErrorBoundary';

const MENU_ITEMS = [
  { to: PATHS.CUSTOMER, name: 'Customers' },
  { to: PATHS.PRODUCT, name: 'Products' },
  { to: PATHS.INVOICE, name: 'Invoices' }
];

const Layout: FC = ({ children }) => {
  return (
    <AntLayout tagName="section">
      <Sider trigger={null}>
        <Menu menuItems={MENU_ITEMS} />
      </Sider>
      <AntLayout className="layout" tagName="section">
        <StyledHeader tagName="header" />
        <ErrorBoundary>
            <StyledContent tagName="main">{children}</StyledContent>
        </ErrorBoundary>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
