import React, { useContext } from 'react'
import {GrCart} from 'react-icons/gr'
import {cafeContext, ProductConsumer} from '../App'
import '../css/itemlist.css'  
export default function ItemsList(props) {
const {state,dispatch} = useContext(cafeContext)
    const {_id,name,img,info,price}= props.product
    // let cart = localStorage.getItem("cart")
    //    cart=JSON.parse(cart)
    //   let incart= cart.find(item=>item._id=_id)
    return(
      
       
      <div className="card" style={{background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(${img})`}} >

      <div className="circle" >
          <h2>{name}</h2>
      </div>
      <div className="content3">
      <p>
        Price:{price}
        </p>
        <button onClick={()=>dispatch({type:"ADD_PRODUCT",payload:_id})}
        // disabled={incart?true:false}
        >Buy Now</button>
      </div>              
  </div>

  
            )
        }
        
        