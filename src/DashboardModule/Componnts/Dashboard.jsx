import React, { useState, useCallback, useEffect } from "react";
import Header from "../../SharedModule/Components/Header/Header.jsx";
import { axiosInstance } from "../../service/urls.js";
import { TASK_URLS, USERS_URL, PROJECT_URLS } from "../../service/api.js";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext/AuthContext.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);


function Dashboard() {
  const { loginData } = useAuth();
  const isManger = loginData?.userGroup === "Manager";

  const [userList, setUserList] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const activeCount = (userList || []).filter((u) => u.isActivated).length;
  const notActiveCount = (userList || []).filter((u) => !u.isActivated).length;
  const [chartdata, setchartdata] = useState(null);
  ChartJS.register(ArcElement, Tooltip, Legend);

 const data = {
  labels: ['TO DO', 'IN PROGRESS', 'DONE'],
  datasets: [
    {
      label: '# of Votes',
      data: [chartdata?.toDo??0,
             chartdata?.inprogres??0,
             chartdata?.done??0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      
      ],
      borderWidth: 1,
    },
  ],
};


  //=======  get all tasks ==============
  const getAllTasks = useCallback(async () => {
    const url = isManger
      ? TASK_URLS.GET_TASKS_BY_MANAGER
      : TASK_URLS.GET_ASSIGNED_TASKS;

    try {
      const response = await axiosInstance.get(url, {
        params: {
          pageSize: 1000,
          pageNumber: 1,
        },
      });

      setAllTasks(response.data.data);
    } catch (error) {
     console.log(error)
    }
  }, [isManger]);

  // ====== get users list =====
  const getAllUsers = useCallback(async () => {
    if (!isManger) return; // Only managers can access this data
    try {
      const response = await axiosInstance.get(USERS_URL.GET_ALL_USERS, {
        params: {
          pageSize: 1000, // Set to a high number to get all users
          pageNumber: 1, // Start from the first page
        },
      });

      // console.log(response.data);
      setUserList(response.data.data);
    } catch (error) {
      console.log(error);
     
    }
  }, [isManger]);

  //=======  get all projects ==============
  const getAllProjects = useCallback(async () => {
    const url = isManger
      ? PROJECT_URLS.GET_ALL_PROJECTS
      : PROJECT_URLS.GET_PROJECTS_BY_EMPLOYEE;
    try {
      const response = await axiosInstance.get(url, {
        params: {
          pageSize: 1000,
        },
      });

      const data = response.data.data;
      setAllProjects(data);
      // console.log(data);
    } catch (error) {
     console.log(error)
      
    }
  }, [isManger]);

  //////////get chartdata//////////
 const getAllChartdata =async()=>{
        try {
            let response =await axios.get('https://upskilling-egypt.com:3003/api/v1/Task/count',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
           console.log(response.data)
            setchartdata(response.data);
          
            
            
        } catch (error) {
            console.log(error)
        }
    }
    
  useEffect(() => {
     getAllUsers();
    getAllProjects();
    getAllTasks();
    getAllChartdata();
    
  }, [getAllProjects, getAllTasks, getAllUsers]);

  
  return (
    <>
      <div className=" h-100 p-4">
        <Header />
        <div
          className=" d-flex
            justify-content-between  p-3 gap-5 "
        >
          <div className="card border-0 w-50 rounded-4 py-4">
            <div className="card-title mb-2">
              <h4  className="ps-3">Tasks</h4>
              <p  className="ps-3">Lorem ipsum dolor sit amet.</p>
            </div>
            <div className=" d-flex justify-content-center p-3">
              <div className="rounded-3 p-3" style={{background:"var(--bg-dash1)",width:"135px"}}>
                <div className="icon-div text-center rounded-3 mb-1" style={{backgroundColor:"var(--bg-dash1-i)"}}>
                  <i class="fa-solid fa-bars-progress mt-2"></i>
                </div>
                <p>Progress</p>
                <div className="static-number">
                       {allTasks.length > 0
                        ? `${allTasks.filter(t => t.status === "In Progress").length}`
                        : 0}
                </div>
              </div>
              <div className="rounded-3 mx-3 ms-3  p-3" style={{background:"var(--bg-dash2)",width:"135px"}}>
                <div className="icon-div text-center rounded-3 mb-1" style={{background:"var(--bg-dash2-i)"}}>
                  <i class="fa-solid fa-list-ol mt-2"></i>
                </div>
                <p>Tasks Number</p>
                <div className="static-number">
                  {allTasks.length}
                </div>
              </div>
              <div className="rounded-3  p-3" style={{background:"var(--bg-dash3)",width:"135px"}}>
                <div className="icon-div text-center rounded-3 mb-1" style={{background:"var(--bg-dash3-i)"}}>
                  <i class="fa-solid fa-diagram-project mt-2"></i>
                </div>
                <p className="">Projects Num</p>
                <div className="static-number">
                  {allProjects.length}
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0 charts-container  w-50 rounded-4 py-4 pe-3">
            {/* {loginData?.userGroup === "Employee"?
            <Doughnut data={data} /> :''} */}
           
            {loginData?.userGroup != "Employee"?
            <div>
            <div className="card-title mb-2"> 
                <h4 className="ps-3">Users</h4> 
                <p className="ps-3">Lorem ipsum dolor sit amet.</p>
            </div> 
           <div className="card-content d-flex  p-3">
               <div className=" rounded-3  p-3 " style={{background:"var(--bg-dash1)",width:"135px"}}>
                <div className="icon-div text-center rounded-3 mb-1"  style={{backgroundColor:"var(--bg-dash1-i)"}}>
                  <i class="fa-solid fa-list-ol mt-2"></i>
                </div>
                <p>Active</p>
                <div className="static-number">{activeCount}</div>
              </div> 
             <div className=" rounded-3 p-3 ms-3"  style={{background:"var(--bg-dash2)",width:"135px"}}>
                <div className="icon-div text-center rounded-3 mb-1" style={{background:"var(--bg-dash2-i)"}}>
                  <i class="fa-solid fa-diagram-project mt-2"></i>
                </div>
                <p>Inactive</p>
                <div className="static-number">{notActiveCount}</div>
              </div> 
             </div></div> : <Doughnut data={data} />}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
