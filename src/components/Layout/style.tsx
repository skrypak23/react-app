import styled from 'styled-components';
import { Layout } from 'antd';
const { Header, Content } = Layout;

export const StyledContent = styled(Content)`
  margin: 24px 16px !important;
  padding: 24px !important;
  background: #fff;
  min-height: 100vh !important;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
`;

export const StyledHeader = styled(Header)`
    background-color: #fff !important;
    padding: 0 !important;
`;
