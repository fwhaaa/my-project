import { Layout } from '@arco-design/web-react';
const Sider = Layout.Sider;
const Content = Layout.Content;
import Menus from './menus';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className='layout-basic-demo'>
      <Layout style={{ height: '400px' }}>
        <Layout>
          <Sider><Menus /></Sider>
          <Content><Outlet /></Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
