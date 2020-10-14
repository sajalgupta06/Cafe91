import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import '../App.css'
import {GrCart} from 'react-icons/gr'
import {cafeContext} from '../App'

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
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
  <div className="navbar-brand " >Cafe 91</div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse "   id="navbarTogglerDemo02">
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0" >
      {renderlist()}
      </ul>
      </div>
</nav>
  );
}
