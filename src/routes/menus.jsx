import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@arco-design/web-react";
import {
  IconBook,
  IconPenFill,
  IconUser,
  IconUserAdd,
  IconUserGroup,
} from "@arco-design/web-react/icon";
import "./menu.css";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function Menus() {
    const username = localStorage.getItem("username");
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const arr = location.pathname.split("/");
    arr.shift();
    setSelectedKeys([arr.join("_")]);
    arr.pop();
    setOpenKeys([...openKeys, arr.join("_")]);
  }, []);

  return (
    <div className="menu-demo" style={{ height: "100%" }}>
      <Menu
        theme="dark"
        style={{ width: "200px", height: "100%" }}
        hasCollapseButton
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClickSubMenu={(key) => {
          if (openKeys.find((v) => v === key)) {
            const newKeys = openKeys.filter((v) => v !== key);
            setOpenKeys(newKeys);
          } else {
            setOpenKeys([...openKeys, key]);
          }
        }}
        onClickMenuItem={(key) => {
          setSelectedKeys([key]);
        }}
      >
        <SubMenu
          key="student_management"
          title={
            <>
              <IconUser />
              学生管理
            </>
          }
        >
          <Link to={`student/management/add`}>
            <MenuItem key="student_management_add">
              <IconUserAdd />
              添加学生
            </MenuItem>
          </Link>
          <Link to={`student/management/list`}>
            <MenuItem key="student_management_list">
              <IconUserGroup />
              学生列表
            </MenuItem>
          </Link>
        </SubMenu>
        {username === "root" && (
          <SubMenu
            key="teacher_management"
            title={
              <>
                <IconUser /> 教师管理
              </>
            }
          >
            <Link to={`teacher/management/add`}>
              <MenuItem key="teacher_management_add">
                <IconUserAdd />
                添加教师
              </MenuItem>
            </Link>
            <Link to={`teacher/management/list`}>
              <MenuItem key="teacher_management_list">
                <IconUserGroup />
                教师列表
              </MenuItem>
            </Link>
          </SubMenu>
        )}

        <SubMenu
          key="exam_management"
          title={
            <>
              <IconPenFill /> 考试管理
            </>
          }
        >
          <Link to={`exam/management/add`}>
            <MenuItem key="exam_management_add">添加考试</MenuItem>
          </Link>
          <Link to={`exam/management/list`}>
            <MenuItem key="exam_management_list">考试列表</MenuItem>
          </Link>
        </SubMenu>
        <SubMenu
          key="questionbank_management"
          title={
            <>
              <IconBook />
              题库管理
            </>
          }
        >
          <Link to={`questionbank/management/add`}>
            <MenuItem key="questionbank_management_add">添加题目</MenuItem>
          </Link>
          <Link to={`questionbank/management/list`}>
            <MenuItem key="questionbank_management_list">题目列表</MenuItem>
          </Link>
        </SubMenu>

        <SubMenu
          key="paper_management"
          title={
            <>
              <IconBook />
              试卷管理
            </>
          }
        >
          <Link to={`paper/management/add`}>
            <MenuItem key="paper_management_add">添加试卷</MenuItem>
          </Link>
          <Link to={`paper/management/list`}>
            <MenuItem key="paper_management_list">试卷列表</MenuItem>
          </Link>
        </SubMenu>

        <SubMenu
          key="score_management"
          title={
            <>
              <IconBook />
              成绩管理
            </>
          }
        >
          <Link to={`score/management/subject`}>
            <MenuItem key="score_management_subject">阅卷</MenuItem>
          </Link>
          {/* <Link to={`score/management/list`}>
                 <MenuItem key='score_management_list'>成绩列表</MenuItem>
                </Link> */}
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Menus;
