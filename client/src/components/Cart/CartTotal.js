import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { cafeContext } from '../../App';

export default function CartTotal(props) {
  const {state,dispatch} = useContext(cafeContext)
  let cartitems =localStorage.getItem("cart")
  cartitems=JSON.parse(cartitems)
     const emptyCart = cartitems.length === 0 ? true : false;
    return (
        <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      dispatch({type:"CLEAR_CART"});
                    }}
                  >
                    clear cart
                  </button>
                
                <h5>
                  <span className="text-title"> subtotal :</span>{" "}
                  <strong>Rs {state.cartSubTotal} </strong>
                </h5>
                <h5>
                  <span className="text-title"> tax :</span>{" "}
                  <strong>Rs {state.cartTax} </strong>
                </h5>
                <h5>
                  <span className="text-title"> total :</span>{" "}
                  <strong>Rs {state.cartTotal} </strong>
                </h5>
                <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {
                  // console.log(state.cart)
                  dispatch({type:"ORDER_NOW"});
                }}
              >
                Order Now
              </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
}
