import React, { useContext, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from "materialize-css";
import "../css/sign.css"
import {GrCart} from 'react-icons/gr'
import { cafeContext } from '../App';
import Cookies from 'js-cookie'
import Navbar from './Navbar';

export default function Signin() {
    const { state, dispatch } = useContext(cafeContext);
  const history = useHistory();
  const [navtoggle,setnavToggle] = useState("")
  const [bannertoggle,setbannerToggle] = useState("banner")
  const [nameS, setNameS] = useState("");
  const [emailS, setEmailS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [phoneS, setPhoneS] = useState("");
    const jwt = localStorage.getItem("jwt")

  if(jwt) {
    history.push('/home');
    
    };
  


  const postData = () => {
    window.event.preventDefault();
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameS,
        password: passwordS,
         phonenum: phoneS,
         email:emailS
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error,classes:"text-light bg-danger" });
        } else {
          
          setclass(!oldclass)

         
          M.toast({ html: "Account created Successfully ", classes:"text-light bg-success"})
          setNameS("")
          setPasswordS("")
          setPhoneS("")
          setEmailS("")
         
        }
      }).catch(error=>{
        M.toast({ error });
      });
  };

  const signIn = () => {
    window.event.preventDefault();
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailS,
        password: passwordS,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error ,classes:"text-light bg-danger"})
        } else {
          localStorage.setItem("jwt", data.token);
          Cookies.set('jwt', data.token)

          M.toast({ html: "Success" ,classes:"text-light bg-success"});
          // window.location.reload(false);
          setTimeout(() => {
            history.push("/home");
            const info = data.user.toString()
            localStorage.setItem("UsER_INF",info)
            localStorage.setItem("cart",'[]')
            Cookies.set('cart', '[]')
            // Cookies.set('UsER_INF', in)
            
          }, 1000);
          
        }
      }).catch(error=>{
        M.toast({ html: "No Internet Connection" ,classes:"text-light bg-danger"})

      });
    };
 
      
      const [oldclass, setclass] = useState(true);
      function refresh(oldclass) {
        window.event.preventDefault();
        setclass(!oldclass);
        
      }
      const toggling=()=>{
        window.event.preventDefault()
        if(navtoggle=="")
        {
          
          setnavToggle("active")
          setbannerToggle("banner active")
        }
        else
        {
          
          setnavToggle("")
          setbannerToggle("banner")
        }
      }
      
      const renderlist=()=>{
        const user=localStorage.getItem('jwt')
        const admin=localStorage.getItem('adminjwt')
    
        if(user)
        {
          return [
    
            <li className="nav-item  ">
            <Link to='/home' className="nav-link" >Home</Link>
            </li>,
            <li className="nav-item  ">
            <Link to='/categories' className="nav-link" >Categories</Link>
            </li>,
            <li className="nav-item ">
            <Link to='/cart' className="nav-link" >MyCart  <span><GrCart></GrCart></span></Link>
            </li>,
            <li className="nav-item ">
            <Link to='/' className="nav-link logout"  onClick={()=>{localStorage.clear() 
              dispatch({type:"CLEAR"})}}>Logout</Link>
            </li>,
          ]
          }
          else if(admin){
            return[
              <li className="nav-item ">
              <Link to='/' className="nav-link" onClick={()=>{localStorage.clear() 
                dispatch({type:"CLEAR"})}}>logout</Link>
              </li>,
            ]
          }
          else{
            return[
              <li className="nav-item ">
              <Link to='/' className="nav-link" >Home</Link>
              </li>,
            <li className="nav-item ">
            <Link to='/admin' className="nav-link" >Admin</Link>
            </li>,
            ]
          }
      }
    return (
        <div>
        <Navbar></Navbar>
        <section className="section ">
        <div className={`container ${oldclass ? " " : "active"}`}>
          <div className="user singinBx">
            <div className="imgBx">
              <img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
            </div>
            <div className="formBx">
              <form>
                <h2>Sign In</h2>
                <input
                  type="text"
                  name=""
                  placeholder="Email"
                  onChange={(e) => setEmailS(e.target.value)}
                ></input>
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  onChange={(e) => setPasswordS(e.target.value)}
                ></input>
                <input
                  type="submit"
                  name=""
                  value="Login"
                  onClick={() => signIn()}
                ></input>
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
            <div className="formBx">
              <form>
                <h2>Create an Account</h2>
                <input
                  type="text"
                  name=""
                  placeholder="Username"
                  onChange={(e) => setNameS(e.target.value)}
                ></input>
                <input
                  type="text"
                  name=""
                  placeholder="email"
                  onChange={(e) => setEmailS(e.target.value)}
                ></input>
                <input
                  type="text"
                  name=""
                  placeholder="phone number"
                  onChange={(e) => setPhoneS(e.target.value)}
                ></input>
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  onChange={(e) => setPasswordS(e.target.value)}
                ></input>
                <input
                  type="submit"
                  name=""
                  value="Signup"
                  onClick={() => postData()}
                ></input>
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
            <div className="imgBx">
              <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
            </div>
          </div>
        </div>
      </section> 
        </div>
    )
}
