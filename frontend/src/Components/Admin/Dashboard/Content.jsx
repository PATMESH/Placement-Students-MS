import React from 'react';
import { Layout } from 'antd';
import Users from './Users';
import DashboardContents from './DashboardContents';
import MarkAnalysis from './MarkAnalysis/MarkAnalysis';

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
    case 'markanalysis':
       content = <MarkAnalysis></MarkAnalysis>;
       break;
    default:
      content = <Users filter={selectedMenu}></Users>;
  }

  return (
    <AntContent className='thumb-control' style={{ padding: '10px', height: '85vh', overflow: 'auto' }}>
      {content}
    </AntContent>
  );
};


export default Content;
