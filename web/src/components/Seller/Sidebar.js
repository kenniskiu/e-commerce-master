import { AiOutlineDashboard,AiOutlineShop,AiOutlineMenuFold,AiOutlineMenuUnfold} from "react-icons/ai";
import styled from "styled-components";
import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarHeader
  } from "react-pro-sidebar";
const Menuitem = styled(MenuItem)`
:hover {
  background-color: #2FCCA1;
  padding: 2px;
  border-radius: 10px;
}`;
const styles = {
    sideBarHeight: {
      minHeight: "100vh",
      backgroundColor:"rgb(29,29,29)"
    }
  };
export default function Sidebar(props) {
  const {collapsed,onClickMenuIcon,active,setRender} = props
  return (
    <ProSidebar collapsed={collapsed} style={styles.sideBarHeight}>
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <SidebarHeader>
            <div className="">
              {active === true && <AiOutlineMenuFold size="30px" className="my-3 mx-auto"/>}
            </div>
            <div className="text-end me-4">
              {active === false && <AiOutlineMenuUnfold size="30px" className="my-3 ms-2"/>}
            </div>
          </SidebarHeader>
        </div>
        <Menu className="mt-4">
          <Menuitem icon={<AiOutlineDashboard size="30px" />} onClick={()=>setRender('1')}>
              Dashboard
          </Menuitem>
          <Menuitem icon={<AiOutlineShop size="30px" />} onClick={()=>setRender('2')}>
              My Shop
          </Menuitem>
        </Menu>
    </ProSidebar>
  )
}
