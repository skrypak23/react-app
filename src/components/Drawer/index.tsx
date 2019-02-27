import React, { ReactNode, FC, MouseEvent } from 'react';
import { StyledDrawer } from './style';

type EventType = MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>;

type Props = {
  title: string;
  visible: boolean;
  onClose: (event: EventType) => void;
  children: ReactNode;
};

const DRAWER_WIDTH = 500;

const Drawer: FC<Props> = ({ title, children, onClose, visible }) => (
  <StyledDrawer
    title={title}
    width={DRAWER_WIDTH}
    onClose={onClose}
    visible={visible}
  >
    {children}
  </StyledDrawer>
);

export default Drawer;
