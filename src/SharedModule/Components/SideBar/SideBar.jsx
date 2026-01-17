
import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../../../AuthContext/AuthContext';


export default function SideBar({isCollapsed,setIsCollapsed}) {
    const navigate =useNavigate();

  // const [isCollapsed, setIsCollapsed ] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  // const { loginData, fullUserData, logOutUser } = useAuth();
  let {loginData,logOutUser} =useContext(AuthContext);
  const Logout =()=>{
    logOutUser();
    navigate("/login",{replace:true});
  }

  return (
    <>
  <div className="sidebar-container">
    
      <Sidebar collapsed={isCollapsed} >
     <Menu  className=' ps-2 '>
   <div onClick={toggleSidebar} className="icon d-flex justify-content-end align-items-center mt-3 "> 
    {isCollapsed?  <i className="fa-solid fa-angle-right"></i>:
    <i className="fa-solid fa-angle-left"></i>}
    
   
   </div>
    <MenuItem component={<Link to="/dashboard" />} className='px-3' icon={<i className="fa-solid fa-home "></i>}> Home </MenuItem>
    {loginData?.userGroup != "Employee"? <MenuItem component={<Link to="/dashboard/user-list" />} className='px-3' icon={<i className="fa-solid fa-users "></i>}> Users </MenuItem> :''}
    <MenuItem component={<Link to="/dashboard/projects" />} className='px-3' icon={<i className="fa-solid fa-project-diagram"></i>}> Projects </MenuItem>
    <MenuItem component={<Link to="/dashboard/tasks" />} className='px-3' icon={<i className="fa-solid fa-tasks"></i>}> Tasks </MenuItem>
    <MenuItem onClick={Logout} className='px-3' icon={<i className="fa-solid fa-sign-out"></i>}> Log out </MenuItem>
  </Menu>
</Sidebar>

  </div>
     </>
  )

}
