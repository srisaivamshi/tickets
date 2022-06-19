import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { config } from "../config";
export default function Admin(props) {
  let icon = props.value;
  let navigate = useNavigate();
  const MovieTitle = useParams();
  const routeChange = () => {
    let path = `/admin`;
    navigate(path);
  };

  const [item, Setitem] = useState({
    Title: "",
    Director: "",
    Price: "",
    Img: "",
    Count: "",
    Favourite: "",
  });
  useEffect(() => {
    if (props.value === "UPDATE") {
      async function getMovieDetails() {
        let response = await fetch(
          `${config.server_url}Movie/${MovieTitle.movieName}`
        );
        let result = await response.json();
        // console.log(result);
        Setitem(result[0]);
      }
      getMovieDetails();
    }
  }, [MovieTitle.movieName, props.value]);
  function handleChange(event) {
    const { name, value } = event.target;
    Setitem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const newModel = {
      Title: item.Title,
      Director: item.Director,
      Price: item.Price,
      Img: item.Img,
      Count: item.Count,
      Favourite: false,
    };
    if (props.value === "UPDATE") {
      console.log(MovieTitle.movieName);
      fetch(`${config.server_url}admin/updateItem/${MovieTitle.movieName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModel),
      }).then();
    } else {
      // eslint-disable-next-line no-template-curly-in-string
      fetch("${config.server_url}admin/AddNewItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModel),
      }).then();
    }
    // eslint-disable-next-line no-lone-blocks
    {
      routeChange();
    }
  }

  return (
    <div className="Admin--main">
      <NavBar size={props.size} name={props.name} Admins={props.Admins} />
      <form className="main-container">
        <div className="login-box">
          <div className="header">
            <h2>{props.heading}</h2>
          </div>
          <div className="login">
            <div className="form-control1">
              <input
                type="text"
                placeholder="Enter movie Name"
                name="Title"
                className="tbox"
                onChange={handleChange}
                value={item.Title}
                required
              />
            </div>
            <div className="form-control1">
              <input
                type="text"
                name="Director"
                placeholder="Enter Director Name"
                className="tbox"
                onChange={handleChange}
                value={item.Director}
                required
              />
            </div>
            <div className="form-control1">
              <input
                type="text"
                name="Price"
                placeholder="Enter Price"
                className="tbox"
                onChange={handleChange}
                value={item.Price}
                required
              />
            </div>
            <div className="form-control1">
              <input
                type="text"
                name="Img"
                placeholder="Enter Image URL"
                className="tbox"
                onChange={handleChange}
                value={item.Img}
                required
              />
            </div>
            <div className="form-control1">
              <input
                type="text"
                name="Count"
                placeholder="Enter Count"
                className="tbox"
                onChange={handleChange}
                value={item.Count}
                required
              />
            </div>
            {/* <div className="form-control1">
            <input
              type="text"
              name="Favourite"
              placeholder="Is Your Favourite Movie"
              className="tbox"
              onChange={handleChange}
              value={item.Favourite}
              required
            />
          </div> */}
            <div className="form-control1">
              <input
                type="submit"
                value={icon}
                className="btn"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
