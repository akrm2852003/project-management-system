// import {ThemeToggle }from '../ThemeToggle/ThemeToggle.jsx'
import React from "react";


import Navbar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from 'react';
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
    const [isCollapsed, setIsCollapsed ] = useState(false);
  
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div className=" d-flex h-100 ">
        
          <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        

        <div className={`content ${isCollapsed?" collapsed":""} w-100`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
