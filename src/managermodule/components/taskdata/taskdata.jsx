import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function TaskData() {
  const [tasksList, setTasksList] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [update, setUpdate] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

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
        toast.success("Project updated successfully", {
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

  useEffect(() => {
    getAllTasks();
    getAllUsers();
    getAllProjects();
    if (id) updateTask();
  }, [id]);

  return (
    <div className="w-100">
      <div className="project-details d-flex justify-content-between mt-1 p-4 pt-3 pb-2 bg-white">
        <div className="pro-title">
          <p>
            <i
              className="fa fa-arrow-left text-muted mx-1 mb-2"
              onClick={() => navigate("/dashboard/tasks")}
            ></i>
            View All Projects
          </p>
          <h2>{id ? "Update Project" : "Add New Project"}</h2>
        </div>
      </div>

      <div className="add-proj w-75 bg-white rounded-4 mt-4">
        <form className="p-5 text-black" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <h5>Title</h5>
            <input
              {...register("title", { required: "field is required" })}
              type="text"
              className="form-control form-style my-2"
              placeholder="Title"
              defaultValue={update?.title || ""}
            />
            {errors.title && (
              <span className="bg-danger">{errors.title.message}</span>
            )}
          </div>

          {/* Description */}
          <div>
            <h5 className="text-muted mb-2 mt-3">Description</h5>
            <input
              {...register("description", { required: "field is required" })}
              type="text"
              className="form-control form-style my-2"
              placeholder="Description"
              defaultValue={update?.description || ""}
            />
            {errors.description && (
              <span className="bg-danger">{errors.description.message}</span>
            )}
          </div>

          <div className="d-flex justify-content-between">
            {/* Employee Dropdown */}
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
              <h5 className="text-muted">Project</h5>
              {loadingUsers ? (
                <p>Loading employees...</p>
              ) : (
                <select
                  {...register("projectId", { required: "field is required" })}
                  className="form-control form-style my-2"
                  value={update?.projectId || ""}
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="" disabled>
                    Select project
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.title}
                    </option>
                  ))}
                </select>
              )}
              {errors.projectId && (
                <span className="bg-danger">{errors.projectId.message}</span>
              )}
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
