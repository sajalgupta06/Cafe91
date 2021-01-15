import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cafeContext } from "./App";
import "./css/userhome.css";
import Navbar from "./components/Navbar";

export default function UserHome() {
  const { state, dispatch } = useContext(cafeContext);
  const [toggle, setToggle] = useState("toggle");
  const [overlay, setOverlay] = useState("overlay");
  const [menu, setMenu] = useState("menu");

  const settoggling = () => {
    if (toggle == "toggle") {
      setToggle("toggle active");
      setOverlay("overlay active");
      setMenu("menu active");
    } else {
      setToggle("toggle");
      setOverlay("overlay");
      setMenu("menu");
    }
  };

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
          console.log(data.error);
        } else {
          dispatch({ type: "ADD_CATEGORY", payload: data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar></Navbar>

      <section className="categories">
        <div className="heading_content">
          <div className="text">
            <h3>Menu</h3>
            <p>Enjoy Your Favorite Food</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {state.category.map((item,index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <Link to={`/items?name=${item.catName}`}>
                    <div className="our-team">
                      <div className="picture">
                        <img className="img-fluid" src={item.img}></img>
                      </div>
                      <div className="team-content">
                        <h3 className="name">{item.catName}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className={toggle} onClick={() => settoggling()}></div>
    </React.Fragment>
  );
}
