import React, { FC } from 'react';
import { Layout as AntLayout, Icon } from 'antd';
const {  Sider } = AntLayout;
import Menu from './Menu';
import {StyledContent, StyledHeader} from './style';
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
        <StyledHeader/>
        <StyledContent>{children}</StyledContent>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
