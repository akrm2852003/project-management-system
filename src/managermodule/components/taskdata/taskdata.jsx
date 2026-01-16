import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function TaskData() {
  const [tasksList, setTasksList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [userList, setUserList] = useState([]);

  
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit function
  const onSubmit = async (data) => {
    if (id) {
      // Update Task
      try {
        const response = await axios.put(
          `https://upskilling-egypt.com:3003/api/v1/Task/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        toast.success("task updated successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/dashboard/tasks");
      } catch (error) {
        console.log(error);
        toast.error("Failed to update task", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } else {
      // Add Task
      try {
        const response = await axios.post(
          "https://upskilling-egypt.com:3003/api/v1/Task",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Task added successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/dashboard/tasks");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add task", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  // Get all tasks
  const getAllTasks = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Task/manager?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasksList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get single task for update
  const updateTask = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUpdate(response.data); // Note: response.data contains task info
    } catch (error) {
      console.log(error);
    }
  };

  // Get all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Users/Manager?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(response.data.data);
      setLoadingUsers(false);
    } catch (error) {
      console.log(error);
      setLoadingUsers(false);
    }
  };

  // Get all projects
  const getAllProjects = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/manager?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProjects(response.data.data);
      setLoadingProjects(false);
      console.log(response );
      
    } catch (error) {
      console.log(error);
      setLoadingProjects(false);
    }
  };

    const getAllProjects = async () => {
      try {
        let response = await axios.get(
          "https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=5&pageNumber=1",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        console.log(response.data.data);
        setProjectsList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  

    const getAllUsers = async () => {
      try {
        let response = await axios.get(
          "https://upskilling-egypt.com:3003/api/v1/Users/Manager?pageSize=10&pageNumber=1",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        console.log(response.data.data);
        setUserList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
      



  useEffect(() => {
    getAllTasks();
    getAllUsers();
    getAllProjects();
    if (id) updateTask();
    getAllProjects();
    getAllUsers();

  }, []);
  return (
    <>
      <div className="project-details d-flex justify-content-between mt-1 p-4 pt-3 pb-2 ">
        <div className="pro-title">
          <p>
            <i
              className="fa fa-arrow-left text-muted mx-1 mb-2"
              onClick={() => navigate("/dashboard/tasks")}
            ></i>
            View All Tasks
          </p>
          <h2>Add New Task</h2>
        </div>
      </div>
      <div className="w-100 ">
        <div className="add-proj w-75  rounded-4 mt-4">
          <form className="p-5 text-black" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h5 className="text-muted">Employee</h5>
              {loadingProjects ? (
                <p>Loading projects...</p>
              ) : (
                <select
                  {...register("employeeId", { required: "field is required" })}
                  className="form-control form-style my-2"
                  value={update?.employeeId || ""}
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="" disabled>
                    Select employee
                  </option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              )}
              {errors.employeeId && (
                <span className="bg-danger">{errors.employeeId.message}</span>
              )}
            </div>

            {/* Project Dropdown */}
            <div>
              <h5 className="text-muted mb-2 mt-3">Description</h5>
              <input
                {...register("description", { required: "field is required" })}
                type="text"
                class="form-control form-style my-2 p-2"
                placeholder="Description"
                defaultValue={update?.data.description}
                aria-label="name"
                aria-describedby="basic-addon1"
              />
              {errors.description && (
                <span className="bg-danger">{errors.description.message}</span>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="text-muted">Emplyee Id</h5>
                  <select class="form-select w-100 mt-2" id="inputGroupSelect01" 
                  {...register("employeeId", { required: "field is required" })}
                  >
                      <option selected>ID</option>
                     
                      {userList.map((user)=>(
                        <option Key={user.id} value={user.id}>{user.id}</option>
                      ))}
                
                   </select>
               
                {errors.employeeId && (
                  <span className="bg-danger">{errors.employeeId.message}</span>
                )}
              </div>
              <div>
                <h5 className="text-muted">Project Id</h5>
                   <select class="form-select w-100 mt-2 " id="inputGroupSelect01" 
                  {...register("projectId", { required: "field is required" })}
                  >
                      <option selected>ID</option>
                      {projectsList.map((proj)=>(
                        <option Key={proj.id}  value={proj.id}>{proj.id}</option>
                      ))}
               
                   </select>
             
                {errors.projectId && (
                  <span className="bg-danger">{errors.projectId.message}</span>
                )}
              </div>
            </div>
            <hr className="mt-5" />
            <div className="btns d-flex justify-content-between">
              <button className="outline-black p-2 mt-3 border-0 rounded-5">
                Cancel
              </button>
              <button
                className=" p-2 mt-3 border-0 rounded-5 text-white"
                style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
              >
                Save
              </button>
            </div>
          </div>

          <hr className="mt-5" />

          {/* Buttons */}
          <div className="btns d-flex justify-content-between">
            <button
              type="button"
              className="outline-black p-2 mt-3 border-0 rounded-5"
              onClick={() => navigate("/dashboard/tasks")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 mt-3 border-0 rounded-5 text-white"
              style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskData;
