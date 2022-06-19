import { useState } from "react";
import "../styles/Profile.css";
import profile from "../photos/profile.png";
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import profile_background from "../photos/profile_background.jpg";
export default function Profile({ loginer, size, name, Admins }) {
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  function handleUser() {
    toast.success("loggedOut SuccessFully");
    fetch(`${config.server_url}logoutUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => {
      //  eslint-disable-next-line no-lone-blocks
      {
        routeChange("/login");
      }
    }, 500);
  }

  const styles = {
    backgroundImage: `url(${profile_background})`,
  };

  return (
    <div className="profile---main">
      <NavBar size={size} name={name} Admins={Admins} />
      {loginer && (
        <div className="profile--main" style={styles}>
          <div className="profile-card">
            <div className="image-container">
              <img src={profile} alt="vamshi" className="profile--img" />
              <div className="title">
                <h2>{loginer.UserName}</h2>
              </div>
            </div>
            <div className="main--container">
              <p className="details">
                <i className="fa fa-phone info"></i>
                &nbsp;&nbsp;&nbsp;{loginer.Phone}
              </p>
              <p className="details">
                <i className="fa fa-envelope info"></i>
                &nbsp;&nbsp;&nbsp;{loginer.Email}
              </p>
              <p className="details">
                <i className="fa fa-university info" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;
                {loginer.College}
              </p>
              <p className="details">
                <i className="fa fa-home info"></i>
                &nbsp;&nbsp;&nbsp;{loginer.Address}
              </p>
            </div>
            <button className="logout--button" onClick={handleUser}>
              Log Out
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={500}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
    </div>
  );
}
