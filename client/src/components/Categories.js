import React, { useContext, useEffect } from "react";
import "../App.css";
// import "../cat.css";
import Items from "./Items";
import { cafeContext, ProductConsumer } from "../App";
import { Link } from "react-router-dom";

export default function Categories() {
  // console.log("its category")
  const { state, dispatch } = useContext(cafeContext);
  useEffect(() => {
    fetch("/searchcategory", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // M.toast({html:data.e})
          console.log(data.error);
        } else {
          dispatch({ type: "ADD_CATEGORY", payload: data });
        
        }
      }).catch(error=>{
        console.log(error)
      });
  }, [])
    
    return (
      <div className="container">
      <div className="row">
        {state.category.map((cat) => {
          return <div className="col-md-4">
            <Link to="/items">
              <div
                className="cardcat cardcat-1"
                onClick={() => {
                  
                  dispatch({ type: "HANDLE_DETAIL", payload: `${cat.catName}` });
                }}
                 style={{background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(${cat.img})`,
                 width:"100%",
                 backgroundSize: "100% 100%",
                justifyContent: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
                minHeight: "400px",
                display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px"
              }
            }
              >
                <h3>{cat.catName}</h3>
              </div>
            </Link>
          </div>;
              
        })}
      </div>
    </div>
  );
}

