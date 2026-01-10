import React from "react";
import logo from '../../../assets/images/navlogo.png'


function Navbar(){
    return(
        <>
          <div className="navbar d-flex bg-white p-2">
            <div className="navbar-container  w-75 d-flex justify-content-between ">
              <div className="logo"><img src={logo} /></div>
              <div className="d-flex">
                 <div className="navbar-icon">
                    <div className="nav-bell mt-2 mx-1"><i class="fa fa-bell" aria-hidden="true"></i></div>
                    {/* <div className="icon-count text-center">1</div> */}
                  </div>
                 <div className="nav-line"></div>
              </div>
            </div>
            <div className="navbar-user w-25 d-flex ">
              <div className="user-img mt-2 ms-3 mx-3"></div>
              <div className="user-info">
                <h6>Upskilling</h6>
                <p>upskiliing@gmail.com</p>
              </div>
            </div>
          </div>
        </>

    )
}
export default Navbar;