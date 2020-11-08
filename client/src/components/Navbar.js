import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import '../App.css'
import {GrCart} from 'react-icons/gr'
import {cafeContext} from '../App'
import '../css/navbar.css'
import { AiOutlineUser, CgProfile } from "react-icons/ai"

export default function Navbar() {
  
  const {state,dispatch} = useContext(cafeContext)

  const renderlist=()=>{
    const user=localStorage.getItem('jwt')
    const admin=localStorage.getItem('adminjwt')

    if(user)
    {
      return [

        <li className="nav-item  ">
        <Link to='/home' className="nav-link" >Home</Link>
        </li>,
        
        <li className="nav-item ">
        <Link to='/cart' className="nav-link" >MyCart  <span><GrCart color="white"></GrCart></span></Link>
        </li>,
        <li className="nav-item ">
        <Link to='/profile' className="nav-link" >Profile  <span><AiOutlineUser></AiOutlineUser></span></Link>
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
          <Link to='/signin' className="nav-link" >Sign in</Link>
          </li>,
        
        ]
      }
  }
  return (
    <div>
    <nav>
    <div className="logo">
Cafe 91</div>
<input type="checkbox" id="click"></input>
    <label for="click" className="menu-btn">
      <i className="fas fa-bars"></i>
    </label>
    
<ul>
{renderlist()}
</ul>
</nav>
 
</div>
  );
}
