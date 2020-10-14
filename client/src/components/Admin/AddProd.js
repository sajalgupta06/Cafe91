import React, { useContext, useState } from 'react'
// import '../../home.css'
import M from 'materialize-css'
import { cafeContext } from '../../App'
export default function Adminpanel() {
  const {state,dispatch} = useContext(cafeContext)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [img, setImg] = useState("")
  const [inCart, setinCart] = useState("")
  const [catName, setcatName] = useState("Category")
  const addProd = () => {
    window.event.preventDefault()
    fetch("/addproduct", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        quantity,
        img,
        inCart,
        catName
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        M.toast({ html: data.error })
      }
      else {
        M.toast({ html: "Product Added Successfully" })
      }
    })

  }
    fetch("/searchcategory", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json()).then(data => { 
      if (data.error) {
        // M.toast({ html: data.error })
        console.log(data.error)
      }
      else {
      
        dispatch({type:"ADD_CATNAME",payload:data})
      }
    })
    
  return (
    <form>
    <h2 className="display-1">Add Product</h2>
    <div className="dropdown show">
    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={(e) => setcatName(e.target.value)}>
    {catName}
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
       
       
        {state.addcatname.map(catname=>{
          return <a className="dropdown-item btn" onClick={(e) => setcatName(`${catname.catName}`)}>{catname.catName}</a>
        })}

        </div>
      </div>
      <input type="text" name="" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>

      <input type="Number" name="" placeholder="Price" onChange={(e) => setPrice(e.target.value)}></input>
      <input type="Number" name="" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)}></input>
      <input type="text" name="" placeholder="img url" onChange={(e) => setImg(e.target.value)}></input>
      <input type="text" name="" placeholder="bool value" onChange={(e) => setinCart(e.target.value)}></input>
      <input type="submit" name="" value="Add Product" onClick={() => addProd()}></input>
    </form>
  )
}