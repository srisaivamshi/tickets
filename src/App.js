import React, { useEffect } from "react";
import "./App.css";
import Items from "./Components/Items";
import Cart from "./Components/Cart";
import WishList from "./Components/WishList";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import TotalItems from "./Components/TotalItems";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Error from "./Components/Error";
import { config } from "./config";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  let [name, SetName] = React.useState(["saivamshi_1"]);

  let [Admins, SetAdmins] = React.useState(false);

  let [loginer, SetLoginer] = React.useState([]);

  let [wishList, setWishList] = React.useState([]);

  let [cart, setCart] = React.useState([]);

  const [price, setPrice] = React.useState(0);

  const [AllItems, setAllItems] = React.useState([]);

  useEffect(() => {
    async function getItems() {
      let response = await fetch(`${config.server_url}admin`);
      let result = await response.json();
      setAllItems(result);
    }

    async function getCartItems() {
      let response = await fetch(`${config.server_url}cart/${name}`);
      let result = await response.json();
      setCart(result);
    }

    async function getwishListItems() {
      let response = await fetch(`${config.server_url}wishlist/${name}`);
      let result = await response.json();
      setWishList(result);
    }

    const handlePrice = () => {
      let ans = 0;
      cart.map((item) => (ans += item.Count * item.Price));
      setPrice(ans);
    };

    async function getLoginDetails() {
      let response = await fetch(`${config.server_url}user`);
      let result = await response.json();
      SetName(result[0].name);
    }

    async function getUserDetails() {
      let response = await fetch(`${config.server_url}loginer/${name}`);
      let result = await response.json();
      SetLoginer(result[0]);
    }

    async function getAllAdmins() {
      let response = await fetch(`${config.server_url}Admins/${name}`);
      let result = await response.json();
      // console.log(result);
      SetAdmins(result);
    }

    getLoginDetails();

    getItems();

    getCartItems();

    getwishListItems();

    getUserDetails();

    getAllAdmins();

    handlePrice();
  }, [cart, name]);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/MainPage"
            element={
              <Items
                AllItems={AllItems}
                size={cart.length}
                name={name}
                wishList={wishList}
                Admins={Admins}
              />
            }
          />
          {/* <Route path="/" element={<Profile loginer={loginer} />} />  */}
          <Route path="/" element={<Navigate to="/login" />} />      
          <Route path="/tickets" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                price={price}
                size={cart.length}
                name={name}
                Admins={Admins}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishList
                wishList={wishList}
                size={cart.length}
                name={name}
                Admins={Admins}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          {Admins && (
            <Route
              path="/admin"
              element={
                <Admin
                  wishList={AllItems}
                  size={cart.length}
                  name={name}
                  Admins={Admins}
                />
              }
            />
          )}
          {!Admins && <Route path="/admin" element={<Error />} />}
          {!Admins && <Route path="/admin/AddNewItem" element={<Error />} />}
          {!Admins && (
            <Route path="/admin/updateItem/:movieName" element={<Error />} />
          )}
          {Admins && (
            <Route
              path="/admin/AddNewItem"
              element={
                <TotalItems
                  heading={"ADD ITEM TO THE STORE"}
                  value={"ADD"}
                  size={cart.length}
                  name={name}
                  Admins={Admins}
                />
              }
            />
          )}
          {Admins && (
            <Route
              path="/admin/updateItem/:movieName"
              element={
                <TotalItems
                  heading={"UPDATE THE ITEM"}
                  value={"UPDATE"}
                  size={cart.length}
                  name={name}
                  Admins={Admins}
                />
              }
            />
          )}
          <Route
            path="/user/:id"
            element={
              <Profile
                loginer={loginer}
                size={cart.length}
                name={name}
                Admins={Admins}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
