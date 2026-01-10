import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom';


const SideBar=({iscollapsed,setiscollapsed})=>{
     const toggleCollapse =()=>{
        setiscollapsed(!iscollapsed)
    }
    return(
        <>
        <div className="sidebar-container vh-100 text-white ">
          
            <Sidebar collapsed={iscollapsed}>
                <div  className="sidebar-icon text-end fs-5" onClick={toggleCollapse}>
                    <i class="fa fa-caret-left" aria-hidden="true"></i>

                </div>
                <Menu className="p-3 pt-0">
                    <MenuItem component={<Link to="/dashboard" />}><i class="fa fa-home mx-3"  aria-hidden="true"></i>Home</MenuItem>
                    <MenuItem  component={<Link to="#"/>}><i class="fa fa-users mx-3" aria-hidden="true"></i>Users</MenuItem>
                    <MenuItem  component={<Link to="/dashboard/projects"/>}><i class="fa fa-list-ul mx-3" aria-hidden="true"></i>Projects</MenuItem>
                    <MenuItem  component={<Link to="/dashboard/tasks"/>}><i class="fa fa-tasks mx-3" aria-hidden="true"></i>Tasks</MenuItem>
                </Menu>
            </Sidebar>
        </div>
        </>

    )
}
export default SideBar;