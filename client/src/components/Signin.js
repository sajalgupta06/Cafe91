import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import "../css/sign.css";
import { GrCart } from "react-icons/gr";
import { cafeContext } from "../App";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

export default function Signin() {
  const { state, dispatch } = useContext(cafeContext);
  const history = useHistory();
  const [navtoggle, setnavToggle] = useState("");
  const [bannertoggle, setbannerToggle] = useState("banner");

  const [value, setValue] = useState({
    name: "",
    password: "",
    email: "",
    error: "",
    message: "",
    loading: false,
    showForm: true,
    passwordSignup: "",
    emailSignup: "",
  });
  const {name,email,password,error,message,loading,showForm,emailSignup
  ,passwordSignup} = value

  const handleChange = data=> (e) => {
    e.preventDefault();
    setValue({...value,error:false,[data]:e.target.value})

  }

  const showLoading = () =>
  loading ? <div className="alert alert-info">Loading....</div> : "";

const showError = () =>
  error ? <div className="alert alert-danger">{error}</div> : "";

const showMessage = () =>
  message ? <div className="alert alert-info">{message}</div> : "";

const handleSubmitSignup = (e) => {
  e.preventDefault();
  setValue({...value,loading:true,error:false})
  const { name, emailSignup, passwordSignup } = value;
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password:passwordSignup,
        email:emailSignup
      }), 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setValue({ ...value, error: data.error, loading: false });  
          
          }else{
            setclass(!oldclass);
          M.toast({
            html: "Account created Successfully!! Please Signin. ",
            classes: "text-light bg-success",

          });
         
          setValue({
            ...value,
            loading: false,
            name: "",
            email: "",
            password: "",
            emailSignup:"",
            passwordSignup:"",
            message: data.message,
            showForm: false,
          });
         
        }
      })
      // .catch((error) => {
      //   M.toast({ error });
      // });
  
};

const handleSubmitSignin = (e) => {
  e.preventDefault();
  setValue({...value,loading:true,error:false})
  const user = {email,password}
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setValue({...value, error:data.error,loading:false})
          
          } else {
          localStorage.setItem("jwt", data.token);
          // Cookies.set("jwt", data.token);


          M.toast({ html: "Success", classes: "text-light bg-success" });
          setTimeout(() => {
            history.push("/home");
            const info = data.user.toString();
            localStorage.setItem("UsER_INF", info);
            localStorage.setItem("cart", "[]");
            // Cookies.set("cart", "[]");
            // Cookies.set('UsER_INF', in)
          }, 1000);
        }
      })
      .catch((error) => {
        M.toast({
          html: "No Internet Connection",
          classes: "text-light bg-danger",
        });
      });
  
};

  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    history.push("/home");
  }

  const [oldclass, setclass] = useState(true);
  function refresh(oldclass) {
    window.event.preventDefault();
    setclass(!oldclass);
  }
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
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>,
        <li className="nav-item ">
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      {showError()}
      {showLoading()}
      {showMessage()}
      <section className="section ">
        <div className={`container ${oldclass ? " " : "active"}`}>
          <div className="user singinBx">
            <div className="imgBx">
              <img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
            </div>
            <div className="formBx">
              <form onSubmit={(e)=>handleSubmitSignin(e)}>
                <h2>Sign In</h2>
                <input
                  type="text"
                  name=""
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                ></input>
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  onChange={handleChange("password")}
            value={password}
                ></input>
                <button type="submit" className="btn btn-primary">
                Signin </button>
              
                <p className="signup">
                  <Link to="/reset">Forgot Password</Link>
                </p>
                <p className="signup">
                  Dont't have an account ?{" "}
                  <a href="#" onClick={() => refresh(oldclass)}>
                    {" "}
                    Sign up
                  </a>{" "}
                </p>
              </form>
            </div>
          </div>

          <div className="user signupBx">
            
            {showForm && <div className="formBx">
              
              <form onSubmit={handleSubmitSignup}>
                <h2>Create an Account</h2>
                <input
                  type="text"
                  name=""
                  placeholder="Username"
                  onChange={handleChange("name")}
            value={name}
                ></input>
                <input
                  type="text"
                  name=""
                  placeholder="email"
                  onChange={handleChange("emailSignup")}
            value={emailSignup}
                ></input>
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  onChange={handleChange("passwordSignup")}
            value={passwordSignup}
                ></input>
                <button type="submit" className="btn btn-primary">
                Signup </button>
                <p className="signup">
                  {" "}
                  Already have an account ?{" "}
                  <a href="#" onClick={() => refresh(oldclass)}>
                    {" "}
                    Sign In
                  </a>{" "}
                </p>
              </form>
              </div>
            }
            <div className="imgBx">
              <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
