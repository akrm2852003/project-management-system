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
      <div className=" mt-2 bg-white rounded-4 shadow-sm">
        <input type="search" placeholder="search"
        className="mb-4 ps-2 rounded-2 border-1"
        />

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
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>
                  <span
                    className= {`badge p-3  ${
                      user.isActivated ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {user.isActivated ? "Active" : "Not Active"}
                  </span>
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
                  <button
                    className="btn btn-sm btn-warning me-2 p-2"
                    onClick={() => toggleActivated(user.id)}
                  >
                    {user.isActivated ? "Block" : "Unblock"}
                  </button>
                  <button
                    className="btn btn-sm btn-primary p-2"
                    onClick={() => handleShowView(user.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* ===== modal ===== */}
      <Modal show={showView} onHide={handleCloseView} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
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
