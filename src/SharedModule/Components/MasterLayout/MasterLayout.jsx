import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import SideBar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";

function Masterlayout(){
    const [iscollapsed ,setiscollapsed] = useState(false);

    return(
        <>
        <div className="w-100">
            <div className="w-100 "><Navbar/></div>
            <div className="d-flex vh-100">
                <div className="sidebar-part">
                    <SideBar iscollapsed={iscollapsed} setiscollapsed={setiscollapsed}/>
                </div>
                <div className={`content ${iscollapsed?" collapsed":""} w-100`} style={{backgroundColor:"rgba(245, 245, 245, 1)"}}>
                    <Outlet/>
                </div>
            
            </div>
        </div>
        </>

    )
}
export default Masterlayout;