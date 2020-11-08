import React, { useContext, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from "materialize-css";
import "../css/sign.css"



export default function Reset() {
  const history = useHistory();
 
  const [emailS, setEmailS] = useState("");  

  const postData = () => {
    window.event.preventDefault();
    fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
         email:emailS
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error,classes:"text-light bg-danger" });
        } else {
            history.push('/signin')
          M.toast({ html: data.message, classes:"text-light bg-success"})
         
        }
      }).catch(error=>{
        M.toast({ error });
      });
  };

    return (
        <div>
        <section className="section ">
        <div className="container">
          <div className="user singinBx">
          <div className="imgBx">
          <img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
        </div>
            <div className="formBx">
              <form>
                <h2>Reset Password</h2>
                <input
                  type="text"
                  name=""
                  placeholder="Email"
                  onChange={(e) => setEmailS(e.target.value)}
                ></input>
                <input
                  type="submit"
                  name=""
                  value="Reset Password"
                  onClick={() => postData()}
                ></input>
               
              </form>
            </div>
          </div>

         </div>
      </section> 
        </div>
    )
}
