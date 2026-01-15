
import React from 'react'
import avatarImg from '../../../assets/images/avatar.png'
import logo from '../../../assets/images/logonavbar.png'
import logodark from '../../../assets/images/logo2.svg'
import { useAuth } from '../../../AuthContext/AuthContext.jsx';
// import { ThemeToggle } from './../ThemeToggle/ThemeToggle';
import { useTheme } from '../ThemeContext/ThemeContext.jsx';
export default function NavBar() {
  const {fullUserData,isLoading}=useAuth();
    if (isLoading) return null;

  const {theme,toggleTheme} =useTheme();
  const isDark = theme === "dark";
 
  const userName = fullUserData?.userName ||  "User";
  const userEmail = fullUserData?.email || "";

  return (
    <>
    <nav className="navbar navbar-expand-lg" >
  <div className="container-fluid">
   <img src={logo} className="logo" alt="logo"  style={{ height: "50px" }}/>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <button className="toggle-btn border-0 rounded-3 mt-2" onClick={toggleTheme}>{theme==="light"?"dark":"light"}</button>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            <i className="fa-solid fa-bell fs-3 mt-2"></i>
          </a>
        </li>
         <li className="nav-line ms-2 me-2"></li>
         <li className="nav-item m-1">
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
