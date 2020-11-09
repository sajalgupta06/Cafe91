import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import "../css/profile.css";
import { cafeContext } from "../App";
import { RiRadioButtonLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
// import '../css/profile_button.css'

export default function Profile() {
  const { state, dispatch } = useContext(cafeContext);
  const [password, setPasswordS] = useState("");
  const [repassword, setrePasswordS] = useState("");
  const [phonenumber, setPhoneNum] = useState("");
  const [userName, setUserName] = useState("");
  const history = useHistory()

  fetch("/userorder", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //  userId:JSON.stringify(localStorage.getItem("UsER_INF"))
      userId: localStorage.getItem("UsER_INF"),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        // M.toast({ html: data.error });
      } else {
        dispatch({ type: "USER_ORDER", payload: data });
      }
    });


    const changepass=()=>{
      window.event.preventDefault();
      if(password!=repassword)
      {
        
        return M.toast({ html: "Password Doesn't Match",classes:"text-light bg-danger"})
      }
      else{

      fetch("/profile-new-password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
     password:password,
     id:localStorage.getItem("UsER_INF")
     
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error,classes:"text-light bg-danger" });
          } else {
              M.toast({ html: data.message, classes:"text-light bg-success"})
              window.location.reload(false)
             
           
          }
        }).catch(error=>{
          M.toast({ error });
        });
      }
}
const changephnnum=()=>{
  window.event.preventDefault();
  
  fetch("/profile-new-phonenumber", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      
 phonenumber,
 id:localStorage.getItem("UsER_INF")
 
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        M.toast({ html: data.error,classes:"text-light bg-danger" });
      } else {
          M.toast({ html: data.message, classes:"text-light bg-success"})
          window.location.reload(false)
         
       
      }
    }).catch(error=>{
      M.toast({ error });
    });
  
}

const changeUserName=()=>{
  window.event.preventDefault();

  fetch("/profile-new-username", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      
 userName,
 id:localStorage.getItem("UsER_INF")
 
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        M.toast({ html: data.error,classes:"text-light bg-danger" });
      } else {
          M.toast({ html: data.message, classes:"text-light bg-success"})
          window.location.reload(false)
         
       
      }
    }).catch(error=>{
      M.toast({ error });
    });
  
}

  return (
    <div>
      <Navbar></Navbar>
      <div className="container-fluid px-lg-4">
        <div className="row">
          <div className="col-md-12 mt-lg-4 mt-4">
            <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
            <h1 style={{ color: "#000", fontSize: "2.5rem" }}>Setting</h1>
            <br></br>
          </div>
          <div className="col-md-12">
            <div className="row">
            <div className="col-sm-4">
            <button type="button" class="btn btn-primary btn-block mb-2" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Password</button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label" >New Password</label>
                      <input type="text" class="form-control" id="recipient-name" onChange={(e) => setPasswordS(e.target.value)} autocomplete="off"/>
                    </div>
                    <div class="form-group">
                    <label for="recipient-name" class="col-form-label" >Re-enter New Password</label>
                    <input type="text" class="form-control" id="recipient-name1" onChange={(e) => setrePasswordS(e.target.value)} autocomplete="off"/>
                  </div>
                  
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onClick={()=>changepass()}>Change Password</button>
                </div>
              </div>
            </div>
          </div>
                  
            </div>
         

            <div className="col-sm-4">
            <button type="button" class="btn btn-primary btn-block mb-2" data-toggle="modal" data-target="#exampleModal2" data-whatever="@fdo">Phone Number</button>

            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel2">Change Phone Number</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label" >New Phone Number</label>
                      <input type="number" class="form-control" id="recipient-name" onChange={(e) => setPhoneNum(e.target.value)} autocomplete="off"/>
                    </div>
                
                  
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onClick={()=>changephnnum()}>Change Phone Number</button>
                </div>
              </div>
            </div>
          </div>
              
            </div>
          

            <div className="col-sm-4">
            <button type="button" class="btn btn-primary btn-block mb-3" data-toggle="modal" data-target="#exampleModal3" data-whatever="@cdo">User Name</button>

            <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel3">Change User Name</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label" >New User Name</label>
                      <input type="text" class="form-control" id="recipient-name" onChange={(e) => setUserName(e.target.value)} autocomplete="off"/>
                    </div>
                
                  
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onClick={()=>changeUserName()}>Change User Name</button>
                </div>
              </div>
            </div>
          </div>
              
            </div>
          

              </div>
          </div>


          <hr></hr>
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="d-md-flex align-items-center">
                  <div>
                    <h4 className="card-title">Past Orders</h4>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table v-middle">
                  <thead>
                    <tr className="bg-light">
                      <th className="border-top-0">Products</th>
                      <th className="border-top-0">Price</th>
                      <th className="border-top-0">Name</th>
                      <th className="border-top-0">Date</th>
                      <th className="border-top-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.userorder.map((order) => {
                      return (
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="">
                                {order.productInfo.map((product) => {
                                  return (
                                    <h6 className="m-b-0 font-16">
                                      {product.count} x {product.name}
                                    </h6>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                          <td>Rs.{order.total}</td>
                          <td>{order.userName}</td>
                          <td>
                            <label className="label label-danger">
                              {order.date}
                            </label>
                          </td>
                          <td>
                            <RiRadioButtonLine color="green"></RiRadioButtonLine>{" "}
                            Order Received
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}












