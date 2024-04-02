import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Space, Button, Modal, Input, Select, notification } from 'antd';
import { LineChartOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const { Option } = Select;

const DashboardContents = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [departmentCounts, setDepartmentCounts] = useState([]);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FFC0CB', '#66CDAA', '#6495ED', '#D2B48C', '#D8BFD8'];

  const columns = [
    { 
        title: 'Name', 
        dataIndex: 'name', 
        key: 'name', 
        sorter: (a, b) => a.name.localeCompare(b.name),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder="Search name"
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => {clearFilters();confirm()}} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        filterDropdownPlacement: 'bottom',
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    },
    { 
        title: 'Email', 
        dataIndex: 'email', 
        key: 'email', 
        sorter: (a, b) => a.email.localeCompare(b.email) 
    },
    { 
        title: 'Department', 
        dataIndex: 'department', 
        key: 'department', 
        sorter: (a, b) => a.department.localeCompare(b.department) 
    },
    { 
        title: 'Action', 
        key: 'action', 
        render: (text, record) => (
            <Space>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
            </Space>
        )
    },
];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    calculateDepartmentCounts();
  }, [users]);

  const fetchUsers = () => {
    fetch("http://localhost:8000/users")
      .then((data) => data.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error fetching users:', error);
  
      });
  };

  const calculateDepartmentCounts = () => {
    const counts = users.reduce((acc, user) => {
      acc[user.department] = (acc[user.department] || 0) + 1;
      return acc;
    }, {});
    const departments = Object.keys(counts).map(department => ({ name: department, value: counts[department] }));
    setDepartmentCounts(departments);
  };

  const handleEdit = (record) => {
    console.log('Edit user:', record);
  };

  const handleDelete = (userId) => {
    console.log('Delete user:', userId);
    notification.success({
      message: 'User Deleted',
      description: 'The user has been successfully deleted.',
    });
    setTimeout(() => {
        notification.destroy();
    }, 1500);
    fetchUsers();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    //delete the user
    fetchUsers();
  };

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`${data.name}: ${data.value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Users" bordered={false}>
            <h1>{users.length}</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Departments" bordered={false} >
            <PieChart width={50} height={50} style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
              <Pie dataKey="value" data={departmentCounts} nameKey="name" cx="50%" cy="50%" outerRadius={25} fill="#8884d8" label>
                {
                  departmentCounts.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                }
              </Pie>
              <Tooltip content={renderCustomTooltip} wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Recent Activity" bordered={false}>
            <LineChartOutlined style={{ fontSize: '48px', color: '#faad14' }} />
          </Card>
        </Col>
      </Row>

      <Card title="User List" style={{ marginTop: '16px' }}>
        <Table columns={columns} dataSource={users} rowKey="id" />
      </Card>
      <Modal
        title="Are you sure?"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
      </Modal>
    </div>
  );
}

export default DashboardContents;
