import React from 'react';
import { Layout } from 'antd';
import Users from './Users';
import DashboardContents from './DashboardContents';

const { Content: AntContent } = Layout;

const Content = ({ selectedMenu }) => {
  let content = selectedMenu;

  switch (selectedMenu) {
    case 'dashboard':
      content = <DashboardContents></DashboardContents>;
      break;
    case 'users':
      content = <Users filter={"All"}></Users>;
      break;
    default:
      content = <Users filter={selectedMenu}></Users>;
  }

  return (
    <AntContent style={{ padding: '24px', height: '88vh', overflow: 'auto' }}>
      {content}
    </AntContent>
  );
};


export default Content;
