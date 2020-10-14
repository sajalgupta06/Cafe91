import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cafeContext } from './App'
import Home from './components/Home'

export default function Localstore() {
    const {state,dispatch} = useContext(cafeContext)
    const UsER_INF=localStorage.getItem("UsER_INF")
    const jwt = localStorage.getItem("jwt")
    const cart = localStorage.getItem("cart")
    if(!UsER_INF||!jwt||!cart)
    {
            localStorage.clear() 
            dispatch({type:"CLEAR"})
    }
    return (
        <div>
            <Link to="/"></Link>
        </div>
    )
}
