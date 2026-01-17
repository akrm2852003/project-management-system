import React, { useEffect , useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {  toast } from 'react-toastify';





function PorjectData(){
    const navigate =useNavigate();
    let {register,formState:{errors},handleSubmit} = useForm();
    const {id} =useParams()
    console.log(id)
    



    const onSubmit =async(data)=>{
       if (id) {
        try {
            let response =await axios.put(`https://upskilling-egypt.com:3003/api/v1/Project/${id}`,data,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            console.log(response.data)
             toast.success('Project updated successfully',{
                            position:"top-center",
                            autoClose:3000,
                            theme:"colored"
                        })
            navigate("/dashboard/projects")
        } catch (error) {
            console.log("ooops")
        }
        
       } else {
        try {
             let response =await axios.post('https://upskilling-egypt.com:3003/api/v1/Project',data,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            // console.log(response.data)
             toast.success('Project added successfully',{
                            position:"top-center",
                            autoClose:3000,
                            theme:"colored"
                        })
            navigate("/dashboard/projects")
            
        } catch (error) {
            console.log(error)
        }
    }
}

       const getAllProjects =async()=>{
            try {
                let response =await axios.get('https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=10&pageNumber=1',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                console.log(response.data.data);
                setProjectsList(response.data.data);
            } catch (error) {
                console.log(error)
            }
        }
    
    const[update,setUpdate]= useState(null)
       

      const updateProj= async()=>{
        try {
            let response =await axios.get(`https://upskilling-egypt.com:3003/api/v1/Project/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            console.log(response)
            setUpdate(response);
        } catch (error) {
            console.log(error)
        }
    }
   

    
        useEffect(()=>{
                getAllProjects()
                if(id)
                    updateProj();
        
         },[])
    return (
      <>
        <div className="project-details d-flex justify-content-between mt-5 p-4 pt-3 pb-2 ">
          <div className="pro-title">
            <p>
              <i
                className="fa fa-arrow-left text-muted mx-1 mb-2"
                onClick={() => {
                  navigate("/dashboard/projects");
                }}
                aria-hidden="true"
              ></i>
              View All Projects
            </p>
            <h2>Add New Project</h2>
          </div>
        </div>
        <div className="w-100 ">
          <div className="add-proj w-75 bg-white rounded-4 mt-4">
            <form className="p-5 text-black" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h5 className="text-muted">Title</h5>
                <input
                  {...register("title", { required: "field is required" })}
                  type="text"
                  className="form-control form-style  my-2"
                  placeholder="Title"
                  defaultValue={update?.data.title}
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                />
                {errors.title && (
                  <span className="bg-danger">{errors.title.message}</span>
                )}
              </div>

              <div>
                <h5 className="text-muted mb-2 mt-3">Description</h5>
                <input
                  {...register("description", {
                    required: "field is required",
                  })}
                  type="text"
                  className="form-control form-style my-2"
                  placeholder="Description"
                  defaultValue={update?.data.description}
                  aria-label="name"
                  aria-describedby="basic-addon1"
                />
                {errors.description && (
                  <span className="bg-danger">
                    {errors.description.message}
                  </span>
                )}
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
            </form>
          </div>
        </div>
      </>
    );
}
export default PorjectData;