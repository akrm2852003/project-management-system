import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Deleteconfirm from "../../../SharedModule/Components/deleteconfirmation/deleteconfirm";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../../AuthContext/AuthContext';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const navigate = useNavigate();
    let {loginData} =useContext(AuthContext);
  

  const [show, setShow] = useState(false);
  const [taskId, settaskId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    settaskId(id);
    setShow(true);
  };

  const getAllTasks = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Task/manager?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      setTasksList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3003/api/v1/Task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(taskId);
      getAllTasks();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <>
      <div className="project-details d-flex justify-content-between mt-1 p-4 ">
        <div className="pro-title">
          {loginData?.userGroup != "Employee"?<h2>Tasks</h2>:<h2>Tasks Board</h2>}
        </div>
        {loginData?.userGroup != "Employee"?
        <div className="pro-btn">
          <button
            className="rounded-5 border-0 p-2 text-white"
            onClick={() => {
              navigate('/dashboard/taskdata');
            }}
            style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
          >
            <i class="fa fa-plus" aria-hidden="true"></i> Add New Task
          </button>
        </div>:''}
      </div>

      <Modal show={show} className="model-style ms-5" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Deleteconfirm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" className="p-1 m-2" onClick={deleteTask}>
      
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
       {loginData?.userGroup != "Employee"?
     <div>
      {tasksList.length > 0 ? (
        <div className="pro-container m-3 border-1 border  overflow-hidden m-4 shadow-lg ">
          <div className="bg-white p-3 ">
            <input
              className="search  search-style"
              style={{ backgroundColor: "rgba(241, 241, 241, 1)" }}
              class="form-control "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <Table className="" striped>
            <thead>
              <tr className="table-head">
                <th>
                  Title <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th>
                  Status <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th>
                  Num User <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th>
                  Num Tasks <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th>
                  Date Created{" "}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                 <th>actions</th> 
              </tr>
            </thead>
            <tbody>
              {tasksList.map((task) => (
                <tr className="table-body">
                  <td>{task.title}</td>
                  <td>
                    <div className="td-style text-center text-white bg-success p-1">
                      Done
                    </div>
                  </td>
                  <td>2</td>
                  <td>8</td>
                  <td>{task.creationDate}</td>

               <td>
                    <div className="dropdown">
                      <span
                        data-bs-toggle="dropdown"
                        style={{ cursor: "pointer", fontSize: "10px" }}
                      >
                        <i class="fa-solid fa-ellipsis"></i>
                      </span>
                      <ul className="dropdown-menu p-2">
                        <li className="dropdown-item  text-success ">
                          <li class="fa-regular fa-eye mx-2"></li>View
                        </li>
                        <Link
                          to={`/dashboard/tasks-data/${task.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <li className="dropdown-item text-success">
                            <li class="fa-solid fa-pen-to-square mx-2"></li>Edit
                          </li>
                        </Link>
                        <li
                          className="dropdown-item  text-success"
                          onClick={() => handleShow(task.id)}
                        >
                          <li class="fa-solid fa-trash mx-2"></li>Delete
                        </li>
                      </ul>
                    </div>
                  </td> 
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <NoData />
      )}</div> :
      <div className="d-flex justify-content-center align-item-center w-100">
        <div className="">
          <h2 className="text-center mt-4 mb-3">ToDo</h2>
          <div className="p-4 pt-4 pb-5 rounded-3 vh-75" style={{backgroundColor:"rgba(14, 56, 47, 1)",height:"300px",width:"340px"}}>
            <div className="p-2 text-white  rounded-3 w-100 mb-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>login Ui</div>
            <div className="p-2 text-white  rounded-3 w-100 mb-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>Login Inegration</div>
            <div className="p-2 text-white  rounded-3 w-100 mb-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>Register Ui</div>
            <div className="p-2 text-white  rounded-3 w-100 mb-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>Register Integration</div>
          </div>
        </div>

        <div className=" mx-3 ms-3">
          <h2 className="text-center mt-4 mb-3">In Progress</h2>
          <div className="p-4 rounded-3 " style={{backgroundColor:"rgba(14, 56, 47, 1)",height:"300px",width:"340px"}}>
            <div className="p-2 text-white  rounded-3 w-100 mb-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>login Ui</div>
            <div className="p-2 text-white  rounded-3 w-100 mb-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>Register Ui</div>

          </div>
        </div>

        <div className="">
          <h2 className="text-center mt-4 mb-3">Done</h2>
          <div className="p-4 rounded-3" style={{backgroundColor:"rgba(14, 56, 47, 1)",height:"300px",width:"340px"}}>
            <div className="p-2 text-white  rounded-3 w-100 mb-2" style={{backgroundColor:"rgba(239, 155, 40, 1)"}}>login Ui</div>
           
          </div>
        </div>
        
      </div>
      }
    </>
  );
}
export default Tasks;
