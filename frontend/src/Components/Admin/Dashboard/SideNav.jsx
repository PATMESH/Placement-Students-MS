// Sidebar.js
import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { DashboardOutlined, UserOutlined, ApartmentOutlined , PieChartOutlined } from '@ant-design/icons';
import '../../../Css/sidebar.css';  

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ onSelectMenu }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(230);
  const [departmentVisible, setDepartmentVisible] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setSidebarWidth(collapsed ? 230 : 30);
  };

  const handleDepartmentClick = () => {
    setDepartmentVisible(!departmentVisible);
  };

  const handleDepartmentSelect = (department) => {
    toggleCollapsed()
    onSelectMenu(department);
    setDepartmentVisible(false);
  };

  return (
    <Sider
      width={sidebarWidth}
      theme="light"
      breakpoint="lg"
      collapsedWidth='0'
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
    >
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />} onClick={() => {onSelectMenu('dashboard');toggleCollapsed();}}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />} onClick={() => {onSelectMenu('users');toggleCollapsed();}}>
          Students
        </Menu.Item>
        <SubMenu
          key="department"
          icon={<ApartmentOutlined />}
          title={
            <span onClick={handleDepartmentClick}>
              Department 
            </span>
          }
          popupClassName={departmentVisible ? 'visible' : ''}
        >
          <Menu.Item key="CSE" onClick={() => handleDepartmentSelect('CSE')}>
            CSE
          </Menu.Item>
          <Menu.Item key="EEE" onClick={() => handleDepartmentSelect('EEE')}>
            EEE
          </Menu.Item>
          <Menu.Item key="ECE" onClick={() => handleDepartmentSelect('ECE')}>
            ECE
          </Menu.Item>
          <Menu.Item key="IT" onClick={() => handleDepartmentSelect('IT')}>
            IT
          </Menu.Item>
          <Menu.Item key="MECH" onClick={() => handleDepartmentSelect('MECH')}>
            MECH
          </Menu.Item>
          <Menu.Item key="CIVIL" onClick={() => handleDepartmentSelect('CIVIL')}>
            CIVIL
          </Menu.Item>
          <Menu.Item key="BIO-MEDICAL" onClick={() => handleDepartmentSelect('BIO-MEDICAL')}>
            BIO-MEDICAL
          </Menu.Item>
          <Menu.Item key="BIO-TECH" onClick={() => handleDepartmentSelect('BIO-TECH')}>
            BIO-TECH
          </Menu.Item>
          <Menu.Item key="CSBS" onClick={() => handleDepartmentSelect('CSBS')}>
            CSBS
          </Menu.Item>
          <Menu.Item key="AIDS" onClick={() => handleDepartmentSelect('AIDS')}>
            AIDS
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="markanalysis" icon={<PieChartOutlined />} onClick={() => {onSelectMenu('markanalysis');toggleCollapsed();}}>
          Mark Analysis
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
