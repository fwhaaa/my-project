import React from 'react';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import Menus from './menus';
import { Link, Outlet } from 'react-router-dom';
import { PageHeader, Radio } from '@arco-design/web-react';
import Head from './header';

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
            <Head></Head>
          </Header>
            <Content><Outlet /></Content>
          </Layout>
        </Layout>
     
    );
  }
}

export default Root;
