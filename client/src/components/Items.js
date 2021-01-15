import React, { useContext, useState } from "react";
import "../css/itemlist.css";
import "../css/userhome.css";
import { cafeContext } from "../App";
import ItemsList from "./ItemsList";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import Navbar from "./Navbar";

const Items = ({ match }) => {
  const [loading, setLoading] = useState("true");
  const { state, dispatch } = useContext(cafeContext);

 
  useEffect(() => {
    fetch("/spawnitems", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        catName: new URLSearchParams(window.location.search).get("name"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          
          console.log(data.error);
        } else {
          dispatch({ type: "SET_PRODUCT", payload: data });
          setLoading(false);
        }
      });
  }, []);
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container3">
        {state.products.map((product) => {
          return loading ? (
            <Loader key={product._id} type="ThreeDots" color="#00BFFF" height={80} width={80} />
          ) : (
            <ItemsList key={product._id} product={product}></ItemsList>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Items;
