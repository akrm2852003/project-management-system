import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Deleteconfirm from "../../../SharedModule/Components/deleteconfirmation/deleteconfirm";
import NoData from "../../../SharedModule/Components/NoData/NoData";

import { AuthContext } from './../../../AuthContext/AuthContext';

function Porjects() {
  const [projectsList, setProjectsList] = useState([]);
  const navigate = useNavigate();
   let {loginData} =useContext(AuthContext);


  const [show, setShow] = useState(false);
  const [projId, setprojId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setprojId(id);
    setShow(true);
  };
  

  const getAllProjects = async () => {

   try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=10&pageNumber=1",
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

  const getAllEmplyeeProjects = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/employee?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      setProjectsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const deleteProj = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3003/api/v1/Project/${projId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(projId);
      getAllProjects();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!loginData?.userGroup)return;
    if(loginData?.userGroup ==="Employee"){
      getAllEmplyeeProjects();
    }else{ getAllProjects();}
    
  }, [loginData]);
  return (
    <>
      <div className="project-details d-flex justify-content-between mt-1 p-4 ">
        <div className="pro-title">
          <h2>Projects</h2>
        </div>
        {loginData?.userGroup != "Employee"?
        <div className="pro-btn">
          <button
            className="rounded-5 border-0 p-2 text-white"
            onClick={() => {
              navigate("/dashboard/projectdata");
            }}
            style={{ backgroundColor: "rgba(239, 155, 40, 1)" }}
          >
            <i class="fa fa-plus" aria-hidden="true"></i> Add New Project
          </button>
        </div> :''}
      </div>

      <Modal show={show} className="  d-flex justify-content-center align-items-center" onHide={handleClose}>
        <Modal.Header className="p-2" closeButton>
      
        </Modal.Header>
        <Modal.Body>
          <Deleteconfirm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" className="p-1 m-2" onClick={deleteProj}>
         
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      {projectsList.length > 0 ? (
        <div className="pro-container m-3">
          <div className="bg-white p-3">
            <input
              className="search border-0 w-25 rounded-4 p-2"
              style={{ backgroundColor: "rgba(241, 241, 241, 1)" }}
              class="form-control "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <Table striped>
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
                {loginData?.userGroup != "Employee"?<th>actions</th>:''}
              </tr>
            </thead>
            <tbody>
              {projectsList.map((proj) => (
                <tr className="table-body">
                  <td>{proj.title}</td>
                  <td>
                    <div className="td-style text-center text-white p-1">
                      Public
                    </div>
                  </td>
                  <td>2</td>
                  <td>8</td>
                  <td>{proj.creationDate}</td>

                  {loginData?.userGroup != "Employee"?<td>
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
                          to={`/dashboard/projectdata/${proj.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <li className="dropdown-item text-success">
                            <li class="fa-solid fa-pen-to-square mx-2"></li>Edit
                          </li>
                        </Link>
                        <li
                          className="dropdown-item  text-success"
                          onClick={() => handleShow(proj.id)}
                        >
                          <li class="fa-solid fa-trash mx-2"></li>Delete
                        </li>
                      </ul>
                    </div>
                  </td> :''}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
export default Porjects;
