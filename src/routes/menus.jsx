import { Menu } from '@arco-design/web-react';
import { IconBook, IconPenFill, IconUser, IconUserAdd, IconUserGroup } from '@arco-design/web-react/icon';
import { Link } from "react-router-dom";
import './menu.css'

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function Menus() {
  
  return (
    <div className='menu-demo' style={{ height: '100%', }}>
      
      <Menu
        style={{ width: '200px', height: '100%' }}
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
      >
        <SubMenu
          key='0'
          title={
            <>
              <IconUser />学生管理
            </>
          }
        >
                <Link to={`student/management/add`}>
                 <MenuItem key='0_0'><IconUserAdd />添加学生</MenuItem>
                </Link>
                <Link to={`student/management/list`}>
                 <MenuItem key='0_1'><IconUserGroup />学生列表</MenuItem>
                </Link>

        </SubMenu>

        <SubMenu
          key='1'
          title={
            <>
              <IconUser /> 教师管理
            </>
          }
        >
                <Link to={`teacher/management/add`}>
                 <MenuItem key='1_0'><IconUserAdd />添加教师</MenuItem>
                </Link>
                <Link to={`teacher/management/list`}>
                 <MenuItem key='1_1'><IconUserGroup />教师列表</MenuItem>
                </Link>

        </SubMenu>

        <SubMenu
          key='2'
          title={
            <>
              <IconPenFill /> 考试管理
            </>
          }
        >
                <Link to={`contacts/1`}>
                 <MenuItem key='2_0'>添加考试</MenuItem>
                </Link>
                <Link to={`contacts/2`}>
                 <MenuItem key='2_1'>考试列表</MenuItem>
                </Link>

        </SubMenu>
        <SubMenu
          key='3'
          title={
            <>
              <IconBook />题库管理
            </>
          }
        >
                <Link to={`contacts/1`}>
                 <MenuItem key='3_0'>题库列表</MenuItem>
                </Link>
                <Link to={`contacts/2`}>
                 <MenuItem key='3_1'>新增题目</MenuItem>
                </Link>

        </SubMenu>
       
      </Menu>

    </div>
  );
}



export default Menus;
