import React, { useContext, useState } from "react";
import '../css/itemlist.css';
import '../css/userhome.css';
import  { cafeContext, ProductConsumer } from "../App";
import ItemsList from "./ItemsList";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";



const Items = ({match}) => { 

const {state,dispatch} = useContext(cafeContext)
const [toggle,setToggle] = useState('toggle')
  const [overlay,setOverlay] = useState('overlay')
  const [menu,setMenu] = useState('menu')
  const settoggling=()=>{
    if(toggle=='toggle')
    {
      setToggle("toggle active")
      setOverlay("overlay active")
      setMenu("menu active")
    }
    else{
      setToggle('toggle')
      setOverlay('overlay')
      setMenu('menu')
    }
  }
  
useEffect(() => {
  
  fetch('/spawnitems', {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
      catName:new URLSearchParams(window.location.search).get("name")
  })
})
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      // M.toast({html:data.e})
      console.log(data.error);
    } else {
      dispatch({ type: "SET_PRODUCT", payload: data });
    
    }
  })

  
}, [])

  return (
    <React.Fragment>
        <div>
    <div className={overlay} onClick={()=>settoggling()}></div>
    <div className={menu} onClick={()=>settoggling()}>
    <ul>
    <li >
          <Link to="/home">
            Home
          </Link>
        </li>
        <li >
          <Link to="/cart" >
            MyCart{" "}
            <span>
              <GrCart></GrCart>
            </span>
          </Link>
        </li>
        <li >
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
    <div className={toggle} onClick={()=>settoggling()}></div>
    </div>
    
    <div className="container3">
    
    {  
      state.products.map((product) => { 
  
    return <ItemsList key={product._id} product={product}></ItemsList>;
        
      })
    }
    </div>
    </React.Fragment>
    
    
  
  );
};

export default Items;

