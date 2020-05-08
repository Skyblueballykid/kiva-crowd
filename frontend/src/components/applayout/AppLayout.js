import React from 'react';
import PropTypes from 'prop-types';
import './AppLayout.css';
import { Layout, Menu, Input } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  InsertRowAboveOutlined,
  UserOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { collapsed } = this.state;


    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <h3 className="logo">Kiva CS411</h3>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/table/loans']}
          >
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
            <Menu.Item key="/table/loans">
              <Link to="/table/loans">
                <InsertRowAboveOutlined />
                <span>Loan Table</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/table/lenders">
              <Link to="/table/lenders">
                <UserOutlined />
                <span>Lender Table</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/statistics">
              <Link to="/statistics">
                <PieChartOutlined />
                <span>Statistics View</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppLayout;
