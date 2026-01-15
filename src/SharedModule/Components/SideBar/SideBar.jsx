
import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext/AuthContext';
export default function SideBar() {
  const [isCollapsed, setIsCollapsed ] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  let {loginData} =useContext(AuthContext);

  return (
    <>
  <div className="sidebar-container ">
    <div className="icon bg-info">

    </div>
      <Sidebar collapsed={isCollapsed} >
     <Menu  className='py-4 ps-4'>
   <div onClick={toggleSidebar} className="icon d-flex justify-content-end align-items-center  "> 
    {isCollapsed?  <i className="fa-solid fa-angle-right"></i>:
    <i className="fa-solid fa-angle-left"></i>}
    
   
   </div>
    <MenuItem component={<Link to="/dashboard" />} icon={<i className="fa-solid fa-home "></i>}> Home </MenuItem>
    {loginData?.userGroup != "Employee"? <MenuItem component={<Link to="/dashboard/user-list" />} icon={<i className="fa-solid fa-users "></i>}> Users </MenuItem> :''}
    <MenuItem component={<Link to="/dashboard/projects" />} icon={<i className="fa-solid fa-project-diagram"></i>}> Projects </MenuItem>
    <MenuItem component={<Link to="/dashboard/tasks" />} icon={<i className="fa-solid fa-tasks"></i>}> Tasks </MenuItem>
    <MenuItem component={<Link to="/login" />} icon={<i className="fa-solid fa-sign-out"></i>}> Log out </MenuItem>
  </Menu>
</Sidebar>

  </div>
     </>
  )

}
