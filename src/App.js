import React, { createContext, useEffect, useState } from 'react'
import { Layout, Row, Typography, Button, Space, Spin, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RegisterModal from './regetrationModal/RegisterModal';
import './App.scss';
import { getMemberList, putMember } from './action';
import { notifiableAPICall } from './notification';
import { loadEnvironment } from './environmentResolver';

const { Title } = Typography;
const { Content } = Layout;

let ENV = {
  "api_url": "",
  "api2_url": ""
};

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [memberList, setMemberList] = useState([]);  // empty []
  const [visble, setVisible] = useState(false);

  const EnvContext = createContext({});

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    async function fun1() {
      ENV = await loadEnvironment();
      setTableLoading(true);
      await loadData();
      setTableLoading(false);
    }

    fun1();
  }, []);

  const loadData = async () => {
    const members = await getMemberList(ENV.api_url);
    setMemberList(members);
  }

  const addUser = async (data) => {
    notifiableAPICall(async () => {
      await putMember(ENV.api_url,data);
      registerModalToggle();
      setTableLoading(true);
      await loadData();
      setTableLoading(false);
    },
      "add_user",
      "Please wait.",
      "Member added successfully",
      "Something went wrong.",
      true
    )
  }

  const registerModalToggle = () => {
    setVisible(!visble);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'id',
      render: (spaceId, row) => (
        <div className="bs-title-label">
          <Row className='bs-rw-sngl'>
            <p>{`${row.firstName} ${row.lastName}`}</p>
          </Row>
        </div>
      )
    },
    {
      title: 'NIC',
      dataIndex: 'nic',
      render: (nic, row) => (
        <div className="bs-title-label">
          <Row className='bs-rw-sngl'>
            <p>{nic}</p>
          </Row>
        </div>
      )
    },
    {
      title: 'Phone Number',
      dataIndex: 'mobileNumber',
      render: (mobileNumber, row) => (
        <div className="bs-title-label">
          <Row className='bs-rw-sngl'>
            <p>{mobileNumber}</p>
          </Row>
        </div>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (address, row) => (
        <div className="bs-title-label">
          <Row className='bs-rw-sngl'>
            <p>{address}</p>
          </Row>
        </div>
      )
    },
  ]

  if (isLoading) {
    return <div className="loading-wrapper"><Spin tip="Loading..." /></div>
  }

  return (
    <EnvContext.Provider value={ENV}>
      <Layout>
        <Layout className="main-content-wrapper">
          <Space direction='vertical'>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Row style={{ marginTop: 15, justifyContent: 'space-between' }}>
                <Title level={4} style={{ fontSize: 30 }}>
                  Registration
                </Title>
                <Button className='btn btn--primary' icon={<PlusOutlined style={{ color: '#fff', fontWeight: "bold" }} />} onClick={() => registerModalToggle()}>Register Now</Button>
              </Row>
            </Space>
            <Content className="table-wrapper">
              {visble &&
                <RegisterModal
                  visible={visble}
                  registerModalToggle={registerModalToggle}
                  addUser={addUser}
                />
              }
              <Table rowKey="id"
                columns={columns}
                dataSource={memberList}
                loading={tableLoading}
                pagination={{
                  total: memberList.length,
                  showSizeChanger: true,
                  showTotal: (total, range) => `showing ${range[0]}-${range[1]} out of ${total} members`
                }} />
            </Content>
          </Space>
        </Layout>
      </Layout>
    </EnvContext.Provider>
  );
}

export default App;
