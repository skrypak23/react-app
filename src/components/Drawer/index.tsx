import React, { ReactNode, FC, MouseEvent } from 'react';
import { Drawer as AntDrawer } from 'antd';
import styles from './style';

type EventType = MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>;

type Props = {
  title: string;
  visible: boolean;
  onClose: (event: EventType) => void;
  children: ReactNode;
};

const DRAWER_WIDTH = 500;

const Drawer: FC<Props> = ({ title, children, onClose, visible }) => (
  <AntDrawer
    title={title}
    width={DRAWER_WIDTH}
    onClose={onClose}
    visible={visible}
    style={styles}
  >
    {children}
  </AntDrawer>
);

export default Drawer;
