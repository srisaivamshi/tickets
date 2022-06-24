import React from "react";
import "../styles/WishList.css";
import empty_wishlist from "../photos/empty-wishlist.svg";
import NavBar from "./NavBar";
import { config } from "../config";
const WishList = ({ wishList, size, name, Admins }) => {
  function RemoveFromWishList(Title) {
    const newModel = {
      user: name,
    };
    fetch(`${config.server_url}wishlist/${Title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModel),
    });
  }

  function AddFromWishToCart(item) {
    console.log(name);
    const newModel = {
      Img: item.Img,
      Title: item.Title,
      Count: item.Count,
      Price: item.Price,
      user: name,
    };
    fetch(`${config.server_url}wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModel),
    }).then();
  }

  return (
    <div className="Admin--main">
      <NavBar size={size} name={name} Admins={Admins} />
      <article className="wish--main">
        {wishList.length === 0 && (
          <div className="wishList--not_there_img"> <img className="empty--wishlist" src={empty_wishlist} alt="vamshi" /></div>
         
        )}
        {wishList.map((item, id) => (
          <div className="WishList--main" key={id}>
            <div className="WishList--img">
              <img src={item.Img} alt="" className="Image" />
              <p>{item.Title}</p>
            </div>
            <div className="Buttons">
              <button
                className="cart--button_plus"
                onClick={() => AddFromWishToCart(item)}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
              </button>
              <button
                className="cart--button_minus"
                onClick={() => RemoveFromWishList(item.Title)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};
export default WishList;
