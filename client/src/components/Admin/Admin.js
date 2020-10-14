import React,{useState, useReducer, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import M from'materialize-css'
import {cafeContext} from '../../App'
import '../../css/sign.css'
// import '../../home.css'
export default function Admin(){
    const {state,dispatch} = useContext(cafeContext)
    const history = useHistory()
    const [nameS,setNameS] = useState("")
    const [emailS,setEmailS] = useState("")
    const [passwordS,setPasswordS] = useState("")
    const [phoneS,setPhoneS] = useState("")


    const signIn=()=>{
        window.event.preventDefault()
        fetch("/adminsignin",{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            
          },
          body:JSON.stringify({
            email:emailS,
            password:passwordS
          })
        }).then(res=>res.json()).then(data=>{if(data.error){
          M.toast({html:data.error})
          }
          else{
            localStorage.setItem("adminjwt",data.token)
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"success"})
            window.location.reload(false)
            history.push('/adminpanel')
    
          }
      })
    }
    return( 
        <section className="section">
        <div className="container">
        <div className="user singinBx">
        <div className="imgBx"><img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img></div>
       <div className="formBx">
       <form>
       <h2>Admin Sign In</h2>
       <input type="text" name="" placeholder="Email" onChange={(e)=>setEmailS(e.target.value)}></input>
       <input type="password" name="" placeholder="Password" onChange={(e)=>setPasswordS(e.target.value)}></input>
       <input type="submit" name="" value="Login" onClick={()=>signIn()}></input>    
       </form>
       </div>
        </div>
        </div>
        </section>

    )
}