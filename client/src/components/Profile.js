import React, { useContext } from "react";
import Navbar from "./Navbar";
import "../css/profile.css";
import { cafeContext } from "../App";
import M from "materialize-css";

export default function Profile() {
  const { state, dispatch } = useContext(cafeContext);

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
        M.toast({ html: data.error });
      } else {
        dispatch({ type: "USER_ORDER", payload: data });
      }
    });

  return (
    <div>
      <Navbar></Navbar>
      <h1>Previous orders</h1>
      <div className="userorder">
      {state.userorder.map(order=>{
          return (
              <div className="card" style={{width: "18rem"}}>
              <div className="card-body">
              <h5 className="card-title">Name: {order.userName}</h5>
              <p className="card-text">Address: {order.address}</p>
              </div>
              <ul className="list-group list-group-flush">
              {order.productInfo.map(product=>{
                  return(
                      
                      <li className="list-group-item">{product.count} x {product.name}</li>
                      )
                    })}
                    </ul>
                    
                    </div>
                    )
                })}
                </div>

    </div>
   
  );
}

