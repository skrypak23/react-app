import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu as AntMenu } from 'antd';

type Link = { to: string; name: string };
type Props = { menuItems: Link[] };
const Item = AntMenu.Item;

const Menu: FC<Props> = ({ menuItems }) => (
  <AntMenu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
    {menuItems.map((item, id) => (
      <Item key={id}>
        <NavLink to={item.to}>{item.name}</NavLink>
      </Item>
    ))}
  </AntMenu>
);

export default Menu;
