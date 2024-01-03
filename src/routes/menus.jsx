import { useState } from 'react';
import { Menu, Slider } from '@arco-design/web-react';
import { IconApps,} from '@arco-design/web-react/icon';
import { Link } from "react-router-dom";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function Menus() {
  const [width, setWidth] = useState(240);
  return (
    <div className='menu-demo' style={{ height: 600 }}>
      <Slider
        style={{ width: 320, marginBottom: 24 }}
        value={width}
        onChange={(value) => setWidth(value)}
        step={10}
        min={160}
        max={400}
      />
      <Menu
        style={{ width: width, height: 'calc(100% - 28px)' }}
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
      >
        <SubMenu
          key='0'
          title={
            <>
              <IconApps /> 学生管理
            </>
          }
        >
                <Link to={`student/management/add`}>
                 <MenuItem key='0_0'>添加学生</MenuItem>
                </Link>
                <Link to={`student/management/list`}>
                 <MenuItem key='0_1'>学生列表</MenuItem>
                </Link>

        </SubMenu>

        <SubMenu
          key='1'
          title={
            <>
              <IconApps /> 教师管理
            </>
          }
        >
                <Link to={`contacts/1`}>
                 <MenuItem key='1_0'>添加教师</MenuItem>
                </Link>
                <Link to={`contacts/2`}>
                 <MenuItem key='1_1'>教师列表</MenuItem>
                </Link>

        </SubMenu>

        <SubMenu
          key='2'
          title={
            <>
              <IconApps /> 考试管理
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
              <IconApps /> 题库管理
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
