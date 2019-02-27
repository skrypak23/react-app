import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Menu as AntMenu } from 'antd';

type Link = { to: string; name: string };
type Props = { menuItems: Link[] } & RouteComponentProps<any>;
const Item = AntMenu.Item;

const Menu: FC<Props> = ({ menuItems, location }) => {
  return (
    <AntMenu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
      {menuItems.map(item => (
        <Item key={item.to}>
          <NavLink to={item.to}>{item.name}</NavLink>
        </Item>
      ))}
    </AntMenu>
  );
};

export default withRouter(Menu);
