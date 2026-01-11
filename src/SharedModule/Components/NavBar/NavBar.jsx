
import React from 'react'
import avatarImg from '../../../assets/images/avatar.png'
import logo from '../../../assets/images/logonavbar.png'
import { useAuth } from '../../../AuthContext/AuthContext.jsx';
// import {ThemeToggle} from '../ThemeToggle/ThemeToggle.jsx'
export default function NavBar() {
  const {fullUserData,isLoading}=useAuth();
    if (isLoading) return null;

 
  const userName = fullUserData?.userName ||  "User";
  const userEmail = fullUserData?.email || "";

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
   <img src={logo} alt="logo"  style={{ height: "50px" }}/>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            <i className="fa-solid fa-bell"></i>
          </a>
        </li>
         <li className="line ms-3 me-3"></li>
         <li className="nav-item ms-3">
               <img src={avatarImg} alt="user-avatar" style={{ height: "40px", borderRadius: "50%" }}/> 
          </li>
       
        <li className="nav-item">
          <a className="nav-link" href="#">{userName}</a>
          <a className="nav-link" href="#">{userEmail}</a>
        </li>
         
        <li className="nav-item d-flex align-items-center ms-2">
          <span></span>
              </li>
       
      </ul>
     
    </div>
  </div>
</nav></>
  )

}
