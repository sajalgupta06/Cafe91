import React, { useState } from "react";
import { useContext } from "react";
import { cafeContext, ProductConsumer } from "../../App";

import { AiFillDelete } from "react-icons/ai";
import "../../css/userhome.css";
import { Link, useHistory } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import "../../css/cart.css";
import M from "materialize-css";

export default function Cart() {
  const { state, dispatch } = useContext(cafeContext);
  const history = useHistory();
  let cartitems = localStorage.getItem("cart");
  cartitems = JSON.parse(cartitems);

  const [toggle, setToggle] = useState("toggle");
  const [overlay, setOverlay] = useState("overlay");
  const [menu, setMenu] = useState("menu");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const orderNow = () => {
    window.event.preventDefault();
    fetch("/orderinfo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cartitems,
        userInfo: 
          {
            id: localStorage.getItem("UsER_INF"),
            name,
            phone,
            address,
          },
        
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
          console.log(data.error)
        } else {
          M.toast({ html: data.mssg ,classes:"text-light bg-success"});
          setTimeout(() => {
            history.push("/home");
            dispatch({ type: "CLEAR_CART" });
            window.location.reload(false)
          }, 1000);
        }
      })
      .catch((error) => {
        M.toast({ error });
      });
  };

  const settoggling = () => {
    if (toggle == "toggle") {
      setToggle("toggle active");
      setOverlay("overlay active");
      setMenu("menu active");
    } else {
      setToggle("toggle");
      setOverlay("overlay");
      setMenu("menu");
    }
  };


  if (cartitems.length==0) {
    return (
      <React.Fragment>
        <div>
          <div className={overlay} onClick={() => settoggling()}></div>
          <div className={menu} onClick={() => settoggling()}>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              
              <li>
                <Link to="/cart">
                  MyCart{" "}
                  
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "CLEAR" });
                  }}
                >
                  Logout
                </Link>
              </li>
              
            </ul>
          </div>
          <div className={toggle} onClick={() => settoggling()}></div>
        </div>
        <div
        className="about">
        <div class="heading_content">
        <div class="text">
        <p>Your Cart is Empty</p>
        </div>
        </div>
      </div>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <div>
          <div className={overlay} onClick={() => settoggling()}></div>
          <div className={menu} onClick={() => settoggling()}>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>

              <li>
                <Link to="/cart">
                  MyCart{" "}
                
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "CLEAR" });
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <div className={toggle} onClick={() => settoggling()}></div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-11 mx-auto">
              <div className="row mt-5 gx-3">
                <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 ">
                  {cartitems.map((item) => {
                    return (
                      <div>
                        <div className="card p-4">
                          <div className="row">
                            <div className="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
                              <img
                                src={item.img}
                                className="img-fluid"
                                alt="cart img"
                              ></img>
                            </div>

                            <div className="col-md-7 col-11 mx-auto px-4 mt-2">
                              <div className="row">
                                <div className="col-6 card-title">
                                  <h1 className="mb-4 product_name">
                                    {item.name}
                                  </h1>
                                </div>
                                
                                <div className="col-6">
                                  <ul className="pagination justify-content-end set-quantity">
                                    <li className="page-item">
                                      <button
                                        className="page-link "
                                        onClick={() => {
                                          return dispatch({
                                            type: "DECREMENT",
                                            payload: item._id,
                                          });
                                        }}
                                      >
                                        <i className="fas fa-minus"></i>{" "}
                                      </button>
                                    </li>
                                    
                                    <li className="page-item">
                                      <input
                                        type="text"
                                        name=""
                                        className="page-link"
                                        value={item.count}
                                        id="textbox"
                                      ></input>
                                    </li>
                                    <li className="page-item">
                                      <button
                                        className="page-link"
                                        onClick={() => {
                                          return dispatch({
                                            type: "INCREMENT",
                                            payload: item._id,
                                          });
                                        }}
                                      >
                                        {" "}
                                        <i className="fas fa-plus"></i>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-8 d-flex justify-content-between remove_wish">
                                  <p
                                    onClick={() =>
                                      dispatch({
                                        type: "REMOVE_ITEM",
                                        payload: item._id,
                                      })
                                    }
                                  >
                                    <i className="fas fa-trash-alt"></i> REMOVE
                                    ITEM
                                  </p>
                                </div>
                                <div className="col-4 d-flex justify-content-end price_money">
                                  <h3>
                                    {" "}
                                    Rs.<span id="itemval">{item.price} </span>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>

                <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                  <div className="right_side p-3 shadow bg-white">
                    <h2 className="product_name mb-5">The Total Amount Of</h2>
                    <div className="price_indiv d-flex justify-content-between">
                      <p>Product amount</p>
                      <p>
                        Rs.
                        <span id="product_total_amt">{state.cartSubTotal}</span>
                      </p>
                    </div>
                    <div className="price_indiv d-flex justify-content-between">
                      <p>Delivery Charge</p>
                      <p>
                        Rs.<span id="shipping_charge">{state.cartTax}</span>
                      </p>
                    </div>
                    <hr />
                    <div className="total-amt d-flex justify-content-between font-weight-bold">
                      <p>The total amount of (including VAT)</p>
                      <p>
                        Rs.<span id="total_cart_amt">{state.cartTotal}</span>
                      </p>
                    </div>
                    <button
                      className="btn btn-primary text-uppercase"
                      onClick={() => {
                        dispatch({ type: "CLEAR_CART" });
                      }}
                    >
                      Clear Cart
                    </button>
                    <br></br>
                    <br></br>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#modalCart"
                    >
                      Procced
                    </button>
                  </div>
                  <div
                    className="modal fade mt-5  "
                    id="modalCart"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title" id="myModalLabel">
                            Billing Info
                          </h4>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form>
                            <div className="form-group">
                              <label for="exampleFormControlInput1">Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                              ></input>
                            </div>
                            <div className="form-group">
                              <input
                                type="Number"
                                class="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Contact Number"
                                onChange={(e) => setPhone(e.target.value)}
                              ></input>
                            </div>

                            <div className="form-group">
                              <label for="exampleFormControlTextarea1">
                                Address
                              </label>
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                onChange={(e) => setAddress(e.target.value)}
                              ></textarea>
                            </div>
                          </form>
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-primary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              orderNow();
                            }}
                          >
                            Order Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="discount_code mt-3 shadow">
                    <div className="card">
                      <div className="card-body">
                        <a
                          className="d-flex justify-content-between"
                          data-toggle="collapse"
                          href="#collapseExample"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          Add a discount code (optional)
                          <span>
                            <i className="fas fa-chevron-down pt-1"></i>
                          </span>
                        </a>
                        <div className="collapse" id="collapseExample">
                          <div className="mt-3">
                            <input
                              type="text"
                              name=""
                              id="discount_code1"
                              className="form-control font-weight-bold"
                              placeholder="Enter the discount code"
                            ></input>
                          </div>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            onclick="discount_code()"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 shadow p-3 bg-white">
                    <div className="pt-4">
                      <h5 className="mb-4">Expected delivery time</h5>
                      <p>Approx 30 Minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div className="row my-1 text-capitalize text-center">
//     {cartitems.map(item=>{
//       return(
//         <React.Fragment>
//         <div className="col-10 mx-auto col-lg-2">
//         <img
//           src={item.img}
//           style={{ width: "5rem", heigth: "5rem" }}
//           className="img-fluid"
//           alt=""
//         />
//       </div>
//       <div className="col-10 mx-auto col-lg-2 ">
//         <span className="d-lg-none">product :</span> {item.name}
//       </div>
//       <div className="col-10 mx-auto col-lg-2 ">
//         <strong>
//           <span className="d-lg-none">price :</span> Rs.{item.price}
//         </strong>
//       </div>
//       <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 ">
//         <div className="d-flex justify-content-center">
//           <div>
//             <span
//               className="btn btn-black mx-1"
//               onClick={() => {
//                   return dispatch({type:"DECREMENT",payload:item._id});
//                 }}
//             >
//               -
//             </span>
//             <span className="btn btn-black mx-1">{item.count}</span>
//             <span
//               className="btn btn-black mx-1"
//               onClick={() => {
//                   return dispatch({type:"INCREMENT",payload:item._id})
//                   ;
//                 }}
//             >
//               +
//             </span>
//           </div>
//         </div>
//         </div>

//       <div className="col-10 mx-auto col-lg-2 ">
//         <div className=" cart-icon" onClick={() =>  dispatch({type:"REMOVE_ITEM",payload:item._id})}>
//         <AiFillDelete></AiFillDelete>
//         </div>
//       </div>

//       <div className="col-10 mx-auto col-lg-2 ">
//         <strong>item total : Rs.{item.total} </strong>
//       </div>
//       </React.Fragment>
//       )
//     })}
//     </div>
