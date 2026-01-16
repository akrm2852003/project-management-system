import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../../../service/urls.js";
import { USERS_URL } from "../../../service/api.js";
import {toast }from "react-toastify";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { isAxiosError } from "axios";
import Search from "../../../SharedModule/Components/Search/Search.jsx";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import NoData from "../../../SharedModule/Components/NoData/NoData.jsx";


export default function Users() {
  // ===== state =====
  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");

  const [userList, setUserList] = useState([]);
  const [viewList, setViewList] = useState(null);
  const [showView, setShowView] = useState(false);

  // ===== modal =====
  const handleCloseView = () => {
    setShowView(false);
    setViewList(null);
  };

  const handleShowView = async (id) => {
    await showUser(id);
    setShowView(true);
  };

  // ===== get users =====
  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(USERS_URL.GET_ALL_USERS, {
        params: {
          pageSize,
          pageNumber,
          ...(searchTitle && { userName: searchTitle }),
        },
      });

      setUserList(response.data.data || []);
   
      
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      } else {
        toast.error("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }, [pageSize, pageNumber, searchTitle]);

  // ===== toggle active =====
  const toggleActivated = async (id) => {
    try {
      await axiosInstance.put(USERS_URL.TOGGLE_USER(id));
      toast.success("Status changed successfully");
      getAllUsers();
    } catch (error) {
      toast.error("Failed to change status");
    }
  };

  // ===== get single user =====
  const showUser = async (id) => {
    try {
      const response = await axiosInstance.get(USERS_URL.GET_USER(id));
      setViewList(response.data);
    } catch {
      toast.error("Failed to load user data");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <>
    <div className="project-details d-flex justify-content-between mt-1 p-4 ">
        <div className="pro-title">
         <h2>Users</h2>
        </div>
        </div>
        {userList.length > 0 ? (
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

        {/* ===== table ===== */}
       <Table striped>
               <thead >
                  <tr className="table-head">
                    <th >User Name <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>Status <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    {/* <th>Image<i class="fa fa-caret-down" aria-hidden="true"></i></th> */}
                    <th>Phone Number <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>Email <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>Date Created <i class="fa fa-caret-down" aria-hidden="true"></i></th>
                    <th>actions</th>
                  </tr>
               </thead>

          <tbody>
            {loading && (
              <tr className="table-body text-center">
                <td colSpan={7} className="py-5">
                  <i className="fa fa-spinner fa-spin fa-2x"></i>
                </td>
              </tr>
            )}

            {!loading && userList.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4  text-muted">
                  No users found
                </td>
              </tr>
            )}

            {userList.map((user) => (
              <tr key={user.id} className="table-body">
                <td>{user.userName}</td>
                <td>
                  {/* <div className="td-style text-center text-white p-1"> */}
                  <span
                    className= {`badge p-2 px-3 rounded-4  ${
                      user.isActivated ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {user.isActivated ? "Active" : "Not Active"}
                  </span>
                {/* </div> */}
                </td>
                {/* <td>
                  <img
                    src={
                      user.imagePath
                        ? `${imgBaseURL}${user.imagePath}`
                        : "/profile.jpeg"
                    }
                    width="40"
                    height="40"
                    alt="user"
                  />
                </td> */}
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{moment(user.creationDate).format("MM-DD-YYYY")}</td>
                <td>
                   <div className="dropdown">
                                        <span
                                          data-bs-toggle="dropdown"
                                          style={{ cursor: "pointer", fontSize: "10px" }}
                                        >
                                          <i class="fa-solid fa-ellipsis"></i>
                                        </span>
                                        <ul className="dropdown-menu p-2">
                                          <li className="dropdown-item  text-success "
                                          onClick={() => toggleActivated(user.id)}>
                                            <li class="fa fa-ban mx-2"></li>
                                            {user.isActivated ? "Block" : "Unblock"}
                                          </li>
                                          
                                          <li
                                            className="dropdown-item  text-success"
                                             onClick={() => handleShowView(user.id)}
                                          >
                                            <li class="fa-solid fa-trash mx-2"></li>View
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
              <NoData />)}

      {/* ===== modal ===== */}
      <Modal show={showView} onHide={handleCloseView} className="  d-flex justify-content-center align-items-center">
        <Modal.Header className="p-1 mx-3" closeButton>
          <Modal.Title className="px-5 p-1 text-start">User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-5">
          {viewList && (
            <>
              {/* <img
                src={
                  viewList.imagePath
                    ? `${imgBaseURL}${viewList.imagePath}`
                    : "/profile.jpeg"
                }
                width="120"
                height="120"
                className="rounded-circle mb-3"
                alt="user"
              /> */}
              <h5>{viewList.userName}</h5>
              <p className="text-muted">{viewList.email}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
