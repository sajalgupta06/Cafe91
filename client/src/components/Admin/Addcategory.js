import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from'materialize-css'


export default function Addcategory() {
  const [cat,setcat] = useState("")  ;
  const [img,setimg] = useState("")  

  const send=()=>{
    window.event.preventDefault();
    fetch("http://localhost:5000/addcategory",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        catName:cat,
        img
    }),
  }).then(res=>res.json()).then(data=>{if(data.e){
    M.toast({html:data.e})
    }
    else{
      // console.log(data)
      M.toast({html:"Category Added Successfully"})

    }
  });
  };
  return <div>
        <h1 className="display-1">Add Category</h1>
        <form>
        <input type= "text"  name="" placeholder="Category" onChange={(e)=>setcat(e.target.value)}></input>
        <input type= "text"  name="" placeholder="Img" onChange={(e)=>setimg(e.target.value)}></input>
        <input type="submit" value="Add"  name="" onClick={()=>send()}></input>
        </form>
  </div>;
}
