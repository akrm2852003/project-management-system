import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Deleteconfirm from "../../../SharedModule/Components/deleteconfirmation/deleteconfirm";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../../AuthContext/AuthContext';
import { DndContext, useDraggable , closestCorners} from "@dnd-kit/core";
// import TaskColumn from "../taskcolumn/taskcolumn";
import Pagination from "../../../SharedModule/Components/Pagination/Pagination";
// import {DndContext,closestCorners} from "@dnd-kit/core";
import '../taskcard/taskcard'
import '../taskcolumn/taskcolumn'
import Column from '../taskcolumn/taskcolumn'





function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [assigntasksList, setAssignTasksList] = useState([]);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();
    let {loginData} =useContext(AuthContext);

    ////////////////////////filteration////////
       const [search ,setSearch] = useState('');
       const [loading ,setLoading] =useState(true);
       const handlechange=(e)=>{
        setSearch(e.target.value)
       }
       const filtertasks =tasksList.filter((task)=>
       task.title.toLowerCase().includes(search.toLowerCase()))
       //////////////////////////////////////

       
          /////////pagination/////////////
          const [pageSize, setPageSize] = useState(6);
       const [pageNumber, setPageNumber] = useState(1);
       const [totalPages, setTotalPages] = useState(1);
       
       const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
       
  

  const [show, setShow] = useState(false);
  const [taskId, settaskId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    settaskId(id);
    setShow(true);
  };

  const getAllTasks = async (size,page) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Task/manager?pageSize=5&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params:{pageSize:size,pageNumber:page}
        }
      );
      console.log(response.data.data);
      setTasksList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
      setTotalNumberOfRecords(response.data.totalNumberOfRecords);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllassignTasks = async (size,page) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Task?pageSize=50&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params:{pageSize:size,pageNumber:page}
        }
      );
      console.log(response.data.data);
      // setAssignTasksList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
      setTotalNumberOfRecords(response.data.totalNumberOfRecords);

      setTasks(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };
//////////////////////////////////////////////////////////////
 const columns = {
  ToDo: tasks.filter(t => t.status === "ToDo"),
  InProgress: tasks.filter(t => t.status === "InProgress"),
  Done: tasks.filter(t => t.status === "Done"),
};

const changeTaskStatus = async (taskId, newStatus) => {
  try {
    await axios.put(
      `https://upskilling-egypt.com:3003/api/v1/Task/${taskId}/change-status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};


const handleDragEnd = (event) => {
  const { active, over } = event;
  if (!over) return;

  const activeTaskId = active.id;
  const activeTaskStatus = active.data.current.status;

  let newStatus;

  if (over.data.current?.type === "COLUMN") {
    newStatus = over.data.current.status;
  }

  if (over.data.current?.type === "TASK") {
    newStatus = over.data.current.status;
  }

  if (!newStatus || newStatus === activeTaskStatus) return;

  setTasks(prev =>
    prev.map(task =>
      task.id === activeTaskId
        ? { ...task, status: newStatus }
        : task
    )
  );

  changeTaskStatus(activeTaskId, newStatus);
};

////////////////////////////////////////////////////////
  const deleteTask = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3003/api/v1/Task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(taskId);
      getAllTasks(pageSize,pageNumber);
      handleClose();
      
    } catch (error) {
      console.log(error);
    }
  };

//////////////////////////////////////

  useEffect(() => {
    getAllTasks(pageSize,pageNumber);
    getAllassignTasks(pageSize,pageNumber);
  }, []);
  return (
    <>
      <div className="project-details d-flex justify-content-between mt-5 p-3  mb-1 ">
        <div className="pro-title">
          {loginData?.userGroup != "Employee"?<h2>Tasks</h2>:<h2>Tasks Board</h2>}
        </div>
        {loginData?.userGroup != "Employee"?
        <div className="pro-btn">
          <button
            className="rounded-5 border-0 p-2 text-white "
            onClick={() => {
              navigate('/dashboard/taskdata');
            }}
            style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
          >
            <i class="fa fa-plus" aria-hidden="true"></i> Add New Task
          </button>
        </div>:''}
      </div>

      <Modal show={show} className="d-flex justify-content-center align-items-center" onHide={handleClose}>
        <Modal.Header className="p-2" closeButton>
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
        <div className="pro-container mt-1 border-1 border  overflow-hidden  shadow-lg ">
          <div className="bg-white p-3 ">
            <input
              className="btn-style w-25 w-md-50 w-lg-25 rounded-4 p-2"
              style={{ backgroundColor: "rgba(241, 241, 241, 1)" }}
              type="search"
              placeholder="Search"
              value={search}
              onChange={handlechange}
              />

          </div>

          <div className="table-responsive">
             <Table striped className="align-middle">

            <thead>
              <tr className="table-head">
                <th>
                  Title <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th>
                  Status <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th className="d-none d-md-table-cell">Num User</th>
                <th className="d-none d-md-table-cell">Num Tasks</th>

                <th className="d-none d-md-table-cell">
                  Date Created{" "}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                 <th>actions</th> 
              </tr>
            </thead>
            <tbody>
              {filtertasks.map((task) => (
                <tr className="table-body">
                  <td>{task.title}</td>
                  <td>
                    <div className="td-style text-center text-white bg-success p-1">
                      Done
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">2</td>
                  <td className="d-none d-md-table-cell">8</td>

                  <td className="d-none d-md-table-cell">{task.creationDate}</td>

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
                          to={`/dashboard/taskdata/${task.id}`}
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

          <Pagination
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          totalNumberOfRecords={totalNumberOfRecords || 0}
          totalPages={totalPages}/>
        
        </div>

        </div>
      ) : (
        <NoData />
      )}
      

      </div> :
      
      <div className="d-flex justify-content-center align-item-center w-100">
         <DndContext collisionDetection={closestCorners}  onDragEnd={handleDragEnd}>
           <div className="board">
           {Object.keys(columns).map(status => (
             <Column
               key={status}
               status={status}
               tasks={columns[status]}
            />
           ))}
           </div>
         </DndContext>


      </div>
      
      }
        
    </>
  );
}

export default Tasks;
