// Dashboard.jsx
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ApartmentOutlined,
  DownOutlined,
} from '@ant-design/icons';
import Sidebar from './Dashboard/SideNav';
import Content from './Dashboard/Content';

const { Header, Content: AntdContent, Footer } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <Layout style={{ height: '99vh', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginTop:'2px' }}>
      <Sidebar onSelectMenu={handleMenuClick}  />
      <Layout style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Header style={{ background: 'darkviolet', padding: 0, color: '#fff', textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <h1 style={{ color: '#fff' }}>VSBEC Students</h1>
        </Header>
        <AntdContent style={{ margin: '16px', borderRadius: '0 0 15px 15px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
          <Content selectedMenu={selectedMenu} />
        </AntdContent>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
