import React from 'react';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import Menus from './menus';
import { Outlet } from 'react-router-dom';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

class Root extends React.Component {
  state = {
    collapsed: false,
  };
  handleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className='layout-collapse-demo'>
        <Sider style={{width:'auto'}}>
          <Menus></Menus>
       
        </Sider>
        <Layout>
          <Header>
          </Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content><Outlet /></Content>
  
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Root;
