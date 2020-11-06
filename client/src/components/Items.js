import React, { useContext, useState } from "react";
import '../css/itemlist.css';
import '../css/userhome.css';
import  { cafeContext, ProductConsumer } from "../App";
import ItemsList from "./ItemsList";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import Loader from 'react-loader-spinner'
import Navbar from "./Navbar";



const Items = ({match}) => { 
const [loading ,setLoading] =useState("true")
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
      setLoading(false)
    
    }
  })

  
}, [])

  return (
    <React.Fragment>
    <Navbar></Navbar>
    <div className="container3">
    
    {  
      state.products.map((product) => { 
  
    return (
    loading?<Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />:<ItemsList key={product._id} product={product}></ItemsList>
    )
      })
    }
    </div>
    </React.Fragment>
    
    
  
  );
};

export default Items;

