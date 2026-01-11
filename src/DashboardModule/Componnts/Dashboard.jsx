import React, { useState, useCallback, useEffect } from "react";
import Header from "../../SharedModule/Components/Header/Header.jsx";
import { axiosInstance } from "../../service/urls.js";
import { TASK_URLS, USERS_URL, PROJECT_URLS } from "../../service/api.js";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext/AuthContext.jsx";

function Dashboard() {
  const { loginData } = useAuth();
  const isManger = loginData?.userGroup === "Manager";

  const [userList, setUserList] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const activeCount = (userList || []).filter((u) => u.isActivated).length;
  const notActiveCount = (userList || []).filter((u) => !u.isActivated).length;

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
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
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
      // console.log(error);
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || "Something went wrong!");
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
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Something went wrong!");
      }
    }
  }, [isManger]);
  useEffect(() => {
     getAllUsers();
    getAllProjects();
    getAllTasks();
  }, [getAllProjects, getAllTasks, getAllUsers]);

  return (
    <>
      <div className="dashboard-container h-100 p-4">
        <Header />
        <div
          className="statics-cards d-flex
            justify-content-between  p-3 gap-5"
        >
          
          <div className="card-container bg-white w-50 rounded-4 py-4">
            <div className="card-title ps-3  ">
              <h4>Tasks</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="card-content d-flex justify-content-evenly pe-3 py-3">
              <div className="card w-25 text-center p-2" style={{background:"#E5E6F4"}}>
                <div className="icon">
                  <i class="fa-solid fa-bars-progress"></i>
                </div>
                <p>Progress</p>
                <div className="static-number">
                       {allTasks.length > 0
                        ? `${allTasks.filter(t => t.status === "In Progress").length}`
                        : 0}
                </div>
              </div>
              <div className="card w-25 text-center p-2" style={{background:"#F4F4E5"}}>
                <div className="icon">
                  <i class="fa-solid fa-list-ol"></i>
                </div>
                <p>Tasks Number</p>
                <div className="static-number">
                  {allTasks.length}
                </div>
              </div>
              <div className="card w-25 text-center p-2" style={{background:"#F4E5ED"}}>
                <div className="icon">
                  <i class="fa-solid fa-diagram-project"></i>
                </div>
                <p>Projects Number</p>
                <div className="static-number">
                  {allProjects.length}
                </div>
              </div>
            </div>
          </div>
          <div className="card-container bg-white w-50 rounded-4 py-4 pe-3">
            <div className="card-title  ps-3">
              <h4>Users</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="card-content d-flex justify-content-between ps-3 py-3">
              <div className="card w-50 text-center p-2 " style={{background:"#E5E6F4"}}>
                <div className="icon">
                  <i class="fa-solid fa-list-ol"></i>
                </div>
                <p>Active</p>
                <div className="static-number">{activeCount}</div>
              </div>
              <div className="card w-50 text-center p-2 ms-2"  style={{background:"#F4F4E5"}}>
                <div className="icon">
                  <i class="fa-solid fa-diagram-project"></i>
                </div>
                <p>Inactive</p>
                <div className="static-number">{notActiveCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;


