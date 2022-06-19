import React from "react";
import "../styles/TotalItems.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { config } from "../config";
const WishList = ({ wishList, size, name, Admins }) => {
  function deleteMovie(k) {
    console.log(size);
    console.log(k);   
    fetch(`${config.server_url}admin/${k}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div className="Admin--main">
      <NavBar size={size} name={name} Admins={Admins} />
      <article className="admin--article">
        {wishList.map((item, id) => (
          <div className="WishList--main1" key={id}>
            <div className="WishList--img1">
              <img src={item.Img} alt="" className="Image" />
              <p>{item.Title}</p>
            </div>
            <div className="Buttons1">
              <Link to={`/admin/updateItem/${item.Title}`}>
                <button className="cart--button_plus1">
                  <i className="fas fa-edit"></i>{" "}
                </button>
              </Link>
              <button
                className="cart--button_minus1"
                onClick={() => deleteMovie(item.Title)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
        <Link to="/admin/AddNewItem" style={{ textDecoration: "none" }}>
          <div className="AddNewOne">AddNewItem</div>
        </Link>
      </article>
    </div>
  );
};
export default WishList;
