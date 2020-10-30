import React from 'react'
import { Link } from 'react-router-dom'

export default function Admindash(){
    return(
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            margin:"auto"
        }}>
        <div>
        <Link to ='/addprod'><button className="btn">Add Product</button></Link>
        <Link to ='/manageprod'><button className="btn">Manage Prod</button></Link>
        <Link to ='/addcategory'><button className="btn">Add Category</button></Link>
        <Link to ='/orders'><button className="btn">Orders</button></Link>
        </div>
        <div>
        <Link to ='/'><button className="btn" onClick={()=>{
            localStorage.clear()
        }}>LogOut</button></Link>
        </div>
        </div>
        )
}

