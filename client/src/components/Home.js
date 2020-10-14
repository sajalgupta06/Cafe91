import React, { useState, useReducer, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import "../css/homepage.css";
import { GrCart } from "react-icons/gr";
import { cafeContext } from "../App";
import Footer from "./Footer"
import facebook from "./img/facebook.png";
import twitter from "./img/twitter.png";
import linkedin from "./img/linkedin.png";

export default function Home() {
  const { state, dispatch } = useContext(cafeContext);
  const history = useHistory();
  const [navtoggle, setnavToggle] = useState("");
  const [bannertoggle, setbannerToggle] = useState("banner");
  const [nameS, setNameS] = useState("");
  const [emailS, setEmailS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [phoneS, setPhoneS] = useState("");

  const toggling = () => {
    window.event.preventDefault();
    if (navtoggle == "") {
      setnavToggle("active");
      setbannerToggle("banner active");
    } else {
      setnavToggle("");
      setbannerToggle("banner");
    }
  };

  const renderlist = () => {
    const user = localStorage.getItem("jwt");
    const admin = localStorage.getItem("adminjwt");

    if (user) {
      return [
        <li className="nav-item  ">
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>,
        <li className="nav-item ">
          <Link to="/cart" className="nav-link">
            MyCart{" "}
            <span>
              <GrCart></GrCart>
            </span>
          </Link>
        </li>,
        <li className="nav-item ">
          <Link
            to="/"
            className="nav-link logout"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
            }}
          >
            Logout
          </Link>
        </li>,
      ];
    } else if (admin) {
      return [
        <li className="nav-item ">
          <Link
            to="/"
            className="nav-link"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
            }}
          >
            logout
          </Link>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item ">
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        </li>,
        <li className="nav-item ">
          <Link to="/signin" className="nav-link">
            Sign IN
          </Link>
        </li>,
      ];
    }
  };
  //   <a href="#" className="logo">
  //   Cafe 91
  // </a>
  // <div id="toggle" onClick={() => toggling()}></div>
  return (
    <React.Fragment>
      <section className={bannertoggle} id="sec">
        <header>
          <section className="curhead">
            <div className="stuff">
              <h1>
                Hola!!<br></br>
                Foodies
              </h1>
              <div className="content">
                <h2>
                  <br></br>
                  <span>Cafe <span>91</span>
                </span>
                </h2>
                <br></br>
                <br></br>
                <p>
                  brings you the most delicious food at your doorsteps.<br></br>
                  Signup to order.
                </p>
                
              </div>
            </div>
            <div className="toggle" onClick={() => toggling()}></div>
          </section>
          </header>
          
          <section className="footer">
          <div className="box">
          <h1>Designed by Sajal gupta</h1>
          
          </div>
          </section>
        
        
        
       
      </section>

      <div id="navigation" className={navtoggle}>
        <ul>{renderlist()}</ul>
      </div>
      <section></section>
 
    </React.Fragment>
  );
}

// <ul className="sci">
//           <li>
//             <a href="#">
//               <img src={facebook}></img>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <img src={twitter}></img>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <img src={linkedin}></img>
//             </a>
//           </li>
//         </ul>
