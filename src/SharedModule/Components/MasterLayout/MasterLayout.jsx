

// import {ThemeToggle }from '../ThemeToggle/ThemeToggle.jsx'
import React from 'react'
import  Sidebar  from '../SideBar/SideBar'

import Navbar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
  <>
     <div className="">
         <Navbar/>
      </div>
      <div className=" d-flex h-100 " >
        <div className="sidebar w-25 ">
          <Sidebar/>
          </div>

       
       <div className="w-100 ">
       
            
        
        
        <Outlet/>
       </div>
      
       
      </div></>

   
  )
}


