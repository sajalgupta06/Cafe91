import M from "materialize-css";
import { useHistory } from "react-router-dom";
const setProducts = (action, state) => {
  state.products = action.payload;
  // console.log(action.payload)
  return { ...state };
};

const lstorage=(state)=>{
  const savedata = JSON.stringify(state.cart)
  let cart = localStorage.getItem("cart")
  cart=JSON.stringify(cart)
  localStorage.setItem("cart",savedata)
  // console.log(localStorage.get(cart))
  return {...state}

}

const getItem = (id, state) => {
 
  const product = state.products.find((item) => item._id === id);
  // console.log(product)
  return product;
};
const addToCart = (id, state) => {  
  let cart = localStorage.getItem("cart")
  cart=JSON.parse(cart)
  if(cart==null)
  {    
    let tempProducts = [state.products];
    const index = tempProducts[0].indexOf(getItem(id, state));
    // console.log(index)
    const product = tempProducts[0][index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    state.cart = [product, ...state.cart];
    lstorage(state);
    addTotals(state);
    M.toast({html:"Added to Cart",classes:"text-light bg-success"})
    return { ...state };
  }
  else{
  const savedprod = cart.find(item=>(item._id==id))
    if(savedprod)
    {
      M.toast({html:"Item Already Present in Cart ",classes:"text-light bg-success"})
      return{...state}
    }
     else
    
    {
      let tempProducts = [state.products];
      const index = tempProducts[0].indexOf(getItem(id, state));
      // console.log(index)
      const product = tempProducts[0][index];
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;
      state.cart = [product, ...state.cart];
      lstorage(state);
      addTotals(state);
      M.toast({html:"Added to Cart" ,classes:"text-light bg-success"})
        return{...state};
    }
    
 
  }

};
const increment = (id, state) => {
  let cartitems =localStorage.getItem("cart")
  cartitems=JSON.parse(cartitems)
  let tempCart = [...cartitems];
  const selectedProduct = tempCart.find((item) => {
    return item._id === id;
  });
  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];
  product.count = product.count + 1;
  product.total = product.count * product.price;
  state.cart = tempCart;
  lstorage(state)
  addTotals(state);
  // console.log(tempCart)
  return { ...state };
};
const decrement = (id, state) => {
  let cartitems =localStorage.getItem("cart")
  cartitems=JSON.parse(cartitems)
  let tempCart = [...cartitems];
  const selectedProduct = tempCart.find((item) => {
    return item._id === id;
  });
  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];
  product.count = product.count - 1;
  if (product.count === 0) {
    return removeItem(id, state);
  } else {
    product.total = product.count * product.price;
    state.cart = tempCart;
    lstorage(state)
    addTotals(state);
    return { ...state };
  }
};
const getTotals = (state) => {
  let cartitems =localStorage.getItem("cart")
  cartitems=JSON.parse(cartitems)
  let subTotal = 0;
  cartitems.map((item) => (subTotal += item.total));
  const tempTax = subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;
  return {
    subTotal,
    tax,
    total,
  };
};
const addTotals = (state) => {
  const totals = getTotals(state);
  state.cartSubTotal = totals.subTotal;
  state.cartTax = totals.tax;
  state.cartTotal = totals.total;
  return { ...state };
};
const removeItem = (id, state) => {
  console.log(state.cart)
  let cartitems =localStorage.getItem("cart")
  cartitems=JSON.parse(cartitems)

  let tempProducts = [...cartitems];
  let tempCart = [...cartitems];
  
  const index = tempProducts.indexOf(cartitems.find((item) => item._id === id));
  
  let removedProduct = tempProducts[index];
  removedProduct.inCart = false;
  removedProduct.count = 0;
  removedProduct.total = 0;
  tempCart = tempCart.filter((item) => {
    return item._id !== id;
  });

  state.cart = tempCart;
  // console.log(state.cart)
  state.products = tempProducts;
  lstorage(state)
  addTotals(state);
  return { ...state };
  // window.location.reload(false)
};
const clearCart = (state) => {
  localStorage.removeItem("cart")
  state.cart = [];
  state.cartSubTotal=0;
  state.cartTotal=0;
  state.cartTax=0;
  // state.cartTotal;
  state.products.map((product) => {
    product.inCart = false;
  });
  lstorage(state)
  return { ...state };
};
const handleDetail = (token, state) => {
  state.catcount = [token];
  return { ...state };
};
const orderNow = (state) => {
  
  const UsER_INF=localStorage.getItem("UsER_INF")
  const jwt = localStorage.getItem("jwt")
  if(!jwt||!UsER_INF)
  {
    return localStorage.clear()
    
  }

  console.log(state.cart);

  fetch("/orderinfo", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: state.cart,
      userInfo: localStorage.getItem("USER_INF")
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        M.toast({html:data.error});
      } else {
        M.toast({html:data.mssg});
      }
    });
    clearCart(state)

  return { ...state };
};
const setUser = (state, action) => {
    const info =JSON.stringify(action.payload)
  localStorage.setItem("INFO",info)
  state.userInfo = action.payload;
  return { ...state };
};
const addcategory = (state, action) => {
  state.category = action.payload;
  // console.log(state.category)
  return { ...state };
};
const clear = (state) => {
  state.products = [];
  state.cart = [];
  state.cartSubTotal = 0;
  state.cartTax = 0;
  state.cartTotal = 0;
  state.catcount = [];
  state.userInfo = [];
  state.category = [];
  state.addcatname = [];
  state.orderInfo = [];
  return { ...state };
};
const addcatname = (state, action) => {
  state.addcatname = action.payload;
  return { ...state };
};

const allorders=(state,action)=>{
state.allOrders = action.payload
return {...state}

}

export const shopreducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return addToCart(action.payload, state);

    case "REMOVE_ITEM":
      return removeItem(action.payload, state);

    case "SET_PRODUCT":
      return setProducts(action, state);

    case "HANDLE_DETAIL":
      return handleDetail(action.payload, state);

    case "INCREMENT":
      return increment(action.payload, state);

    case "DECREMENT":
      return decrement(action.payload, state);

    case "GET_TOTAL":
      return getTotals(action, state);

    case "ADD_TOTAL":
      return addTotals(state);

    case "CLEAR_CART":
      return clearCart(state);

    case "ORDER_NOW":
      return orderNow(state);
    case "USER":
      // const info = action.payload
      return setUser(state, action);
    case "ADD_CATEGORY":
      // const info = action.payload
      return addcategory(state, action);
    case "CLEAR":
      return clear(state);
    case "ALL_ORDERS":
      return allorders(state, action);
    case "ADD_CATNAME":
      return addcatname(state, action);
  }
};
