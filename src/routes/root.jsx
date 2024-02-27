import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import Menus from './menus';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PageHeader, Radio } from '@arco-design/web-react';
import Head from './header';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;



function Root() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [collapsed,setCollapsed] = useState(false);
  function handleCollapsed(){
   setCollapsed(collapsed => !collapsed );
  }
  
  function BeforeRouterEnter() {
    const username = localStorage.getItem("username");
    if (!username) {
     navigate('/login')
    }
  } 

  useEffect(()=>{
    BeforeRouterEnter();
  },[])
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


export default Root;
