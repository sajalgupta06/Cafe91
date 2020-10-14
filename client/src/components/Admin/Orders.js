import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cafeContext } from "../../App";
import M from "materialize-css";

export default function Orders() {
  const { state, dispatch } = useContext(cafeContext);

  fetch("http://localhost:5000/adminorder", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        M.toast({ html: data.error });
      } else {
        dispatch({ type: "ALL_ORDERS", payload: data });
      }
    });

    // {console.log(state.allOrders)}
  return (
    <div>
      <h1 className="display-1">Orders</h1>
      {state.allOrders.map((order) => {
        return (
          <div className="card">
           <h4> <div className="card-header">{order.userName}<br></br>{order.contactNum}</div></h4>
            <div className="card-body">
              <h5 className="card-title">
              {order.productInfo.map(product=>{
                return(
                  <h5>{product.count}X{product.name}</h5>
                )
              })}
              </h5>
              <p className="card-text">
                {order.address}
              </p>
              <a href="#" className="btn btn-primary">
                Order is Preparing
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
