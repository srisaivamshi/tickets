import React from "react";
import "../styles/cart.css";
import empty_cart from "../photos/empty-cart.jpg";
import { config } from "../config";
import NavBar from "./NavBar";
const Cart = ({ cart, price, size, name, Admins }) => {
  function RemoveFromCart(Title) {
    const newVal = {
      user: name,
    };
    fetch(`${config.server_url}cart/${Title}`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVal),
    });
  }
  function handleChange(item, Adder) {
    console.log(item.Count);
    if (Adder === -1 && item.Count === 1) return;
    const newVal = {
      Count: item.Count,
      Delimiter: Adder,
      user: name,
    };
    fetch(`${config.server_url}cart/${item.Title}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVal),
    }).then();
  }
  return (
    <div className="Admin--main">
      <NavBar size={size} name={name} Admins={Admins} />
      <article className="cart--main">
        {cart.map((item, id) => (
          <div className="cart_box" key={id}>
            <div className="cart_img">
              <img src={item.Img} alt="" />
              <p>{item.Title}</p>
            </div>
            <div className="Buttons">
              <button
                className="cart--button_plus"
                onClick={() => handleChange(item, 1)}
              >
                +
              </button>
              <button className="cart--button">{item.Count}</button>
              <button
                className="cart--button_minus"
                onClick={() => handleChange(item, -1)}
              >
                -
              </button>
            </div>
            <div className="cart--last">
              <span>{item.Price}</span>
              <button onClick={() => RemoveFromCart(item.Title)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
        {price === 0 && (
          <div className="not_there">
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
              alt="vamshi"
              className="not_there--img"
            ></img>
            {/* <h1>Your Cart Is Empty!</h1> */}
          </div>
        )}
        {price !== 0 && (
          <div className="total">
            <div className="first">Total Price :</div>
            <div className="second">Rs - ₹{price}</div>
          </div>
        )}
      </article>
    </div>
  );
};
export default Cart;