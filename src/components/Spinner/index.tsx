import React from 'react';
import { Spin } from 'antd';
import './style.css';

export default () => (
  <div className="container">
    <Spin size="large" className="spin" />
  </div>
);
