
import React from 'react'
import{ useAuth } from '../../../AuthContext/AuthContext.jsx';
export default function Header({ description}) {


   const { fullUserData, isLoading } = useAuth(); 
    if (isLoading) return null;
  const userName = fullUserData?.userName || "User";

    const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
      ? "Good Afternoon"
      : "Good Evening";
  return (
   <header className=" text-white d-flex flex-column justify-content-center p-4 rounded-3 mt-4"> 
    <div className="container-fluid ">
      <div className="row">
        <div className="">
          <h3 className='mb-2'>{greeting}, <span style={{color: "rgba(239, 155, 40, 1)"}}>{userName}</span></h3>
        <p style={{color: "rgba(201, 201, 201, 1)"}}>You can add project and assign tasks to your team</p>
        </div>
      </div>
    </div>
   </header>
  )
}
