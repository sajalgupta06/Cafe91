import React, { useEffect, useReducer,useContext ,createContext} from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Items from './components/Items'
import Footer from './components/Footer'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories' 
import Admindash from './components/Admin/Admindash'
import Manageprod from './components/Admin/Manageprod' 
import UserHome from './UserHome'
import {BrowserRouter,Route,useHistory, Switch} from 'react-router-dom'
import {shopreducer} from './reducer'
import Admin from './components/Admin/Admin'
import AddProd from './components/Admin/AddProd'
import Orders from './components/Admin/Orders'
import Addcategory from './components/Admin/Addcategory'
import Signin from './components/Signin'
import Localstorage from './Localstore';
import Localstore from './Localstore'
import Profile from './components/Profile';
// import Cookies from 'js-cookie'
import Reset from './components/Reset'
import NewPassword from './components/NewPassword';
export const cafeContext = createContext();



const  Routing=()=>{
  const {state,dispatch} = useContext(cafeContext)
  const history = useHistory() 
  let cartitems =localStorage.getItem("cart")
  cartitems=JSON.parse(cartitems)
  
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
  if(cartitems!=null)
  addTotals(state) 

    let cart = localStorage.getItem("cart")
  cart=JSON.parse(cart)
  state.cart=cart

useEffect(()=>{ 
    const admin = localStorage.getItem("adminjwt") 
    const UsER_INF=localStorage.getItem("UsER_INF")
    // const jwt = localStorage.getItem("jwt")
    // const jwt=Cookies.get('jwt')
    const cart = localStorage.getItem("cart")

  
  // if(admin) {
  //   history.push('/admindash')
   
  // }
  // else if(!cart){
  //   localStorage.clear()
  //   history.push('/') 
  // }
},[])

  return (
    <Switch>
  
    <Route exact path='/' component={UserHome}></Route>
    <Route exact path='/home' component={UserHome}></Route>
    <Route exact path='/cart' component={Cart}></Route>
    <Route exact path='/admin' component={Admin}></Route>
    <Route exact path='/addprod' component={AddProd}></Route>
    <Route exact path='/admindash' component={Admindash}></Route>
    <Route exact path='/manageprod' component={Manageprod}></Route>
    <Route exact path='/addcategory' component={Addcategory}></Route>
    <Route exact path='/signin' component={Signin}></Route>
    <Route exact path='/Orders' component={Orders}></Route>
    <Route exact path='/profile' component={Profile}></Route>
    <Route exact path='/reset' component={Reset}></Route>
    <Route exact path='/reset/:token' component={NewPassword}></Route>
    
    <Route  path='/items' component={Items}></Route>
    </Switch>
  )
}

const App=()=> {
  const istate = {
    products:[],
    cart:[],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    catcount:[],
    orderInfo:[],
    category:[],
    addcatname:[],
    userInfo:[],
    allOrders:[],
    userorder:[],
    
};
  const [state,dispatch] = useReducer(shopreducer,istate)
  return (
    <cafeContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    
    <Routing></Routing>
    <Footer></Footer>
    
    </BrowserRouter>
    </cafeContext.Provider>
    );
    // <Localstore></Localstore>
  }


const ProductConsumer = cafeContext.Consumer
export {ProductConsumer}

export default App;
