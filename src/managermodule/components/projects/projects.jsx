import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Deleteconfirm from "../../../SharedModule/Components/deleteconfirmation/deleteconfirm";
import NoData from "../../../SharedModule/Components/NoData/NoData";

import { AuthContext } from './../../../AuthContext/AuthContext';
import Search from "../../../SharedModule/Components/Search/Search";
import Pagination from "../../../SharedModule/Components/Pagination/Pagination";

function Porjects() {
  const [projectsList, setProjectsList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
   let {loginData} =useContext(AuthContext);

   ////////////////////////filteration////////
   const [search ,setSearch] = useState('');
   const [loading ,setLoading] =useState(true);
   const handlechange=(e)=>{
    setSearch(e.target.value)
   }
   const filterprojects =projectsList.filter((project)=>
   project.title.toLowerCase().includes(search.toLowerCase()))
   //////////////////////////////////////

   /////////pagination/////////////
   const [pageSize, setPageSize] = useState(6);
const [pageNumber, setPageNumber] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);


  const [show, setShow] = useState(false);
  const [projId, setprojId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setprojId(id);
    setShow(true);
  };
  

  const getAllProjects = async (size,page) => {

   try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=5&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params:{pageSize:size,pageNumber:page}
        }
      );
      console.log(response.data.data);
      setProjectsList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
      setTotalNumberOfRecords(response.data.totalNumberOfRecords);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllEmplyeeProjects = async (size,page) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/employee?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params:{pageSize:size,pageNumber:page}
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
      getAllProjects(pageSize,pageNumber);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!loginData?.userGroup)return;
    if(loginData?.userGroup ==="Employee"){
      getAllEmplyeeProjects(pageSize,pageNumber);
    }else{ getAllProjects(pageSize,pageNumber);}
    
  }, [loginData ,pageSize,pageNumber]);
  return (
    <>
      <div className="project-details d-flex justify-content-between mt-5 p-3  mb-1 ">
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
        <div className="pro-container mt-1 mt-0 border  overflow-hidden  shadow-lg ">
          <div className="bg-white p-3">
           
            <input
              className="btn-style w-25 w-md-50 w-lg-25 rounded-4 p-2"
              style={{ backgroundColor: "rgba(241, 241, 241, 1)" }}
              
              type="search"
              placeholder="Search..."
              aria-label="Search"
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
                <th className="d-none d-md-table-cell">
                  Num User <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th className="d-none d-md-table-cell">
                  Num Tasks <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                <th className="d-none d-md-table-cell">
                  Date Created{" "}
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </th>
                {loginData?.userGroup != "Employee"?<th>actions</th>:''}
              </tr>
            </thead>
            <tbody>
              {filterprojects.map((proj) => (
                <tr className="table-body">
                  <td>{proj.title}</td>
                  <td>
                    <div className="td-style text-center text-white p-1">
                      Public
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">2</td>
                  <td className="d-none d-md-table-cell">8</td>
                  <td className="d-none d-md-table-cell">{proj.creationDate}</td>

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
     

    </>
  );
}
export default Porjects;
