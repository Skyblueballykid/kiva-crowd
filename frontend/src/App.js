import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  InsertRowAboveOutlined,
  UserOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import LoanTableView from './pages/LoanTableView';
import LenderTableView from './pages/LenderTableView';
import StatisticsView from './pages/StatisticsView';

const { Header, Sider, Content } = Layout;

class App extends React.Component {
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
      <BrowserRouter>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <h3 className="logo">Kiva CS411</h3>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['/table/loans']}
            >
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
              <Switch>
                <Route path="/table/loans" component={LoanTableView} />
                <Route path="/table/lenders" component={LenderTableView} />
                <Route path="/statistics" component={StatisticsView} />

                <Redirect from="/" to="/table/loans" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
