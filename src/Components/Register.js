import "../styles/Register.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import register from "../photos/register.jpg";
import { config } from "../config";
export default function Register() {
  const [item, Setitem] = useState({
    Email: "",
    UserName: "",
    Phone: "",
    Password: "",
    Address: "",
    College: "",
  });
  const [show, setShow] = useState(false);

  useEffect(() => {});

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  function handlesChange(event) {
    const { name, value } = event.target;
    Setitem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  async function handlesSubmit(event) {
    event.preventDefault();
    let newVal = {
      Email: item.Email,
      UserName: item.UserName,
      Phone: item.Phone,
      Password: item.Password,
      Address: item.Address,
      College: item.College,
    };
    let response = await fetch(`${config.server_url}register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newVal),
    });
    let result = await response.json();
    console.log(result);
    if (!result) {
      setShow(true);
      console.log("if also came");
    } else {
      console.log("else also came");
      fetch(`${config.server_url}user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newVal),
      });
      toast.success("Registered SuccessFul");
      setTimeout(() => {
        //  eslint-disable-next-line no-lone-blocks
        {
          routeChange("/login");
        }
      }, 1000);
    }
  }
  const styles = {
    backgroundImage: `url(${register})`,
  };
  return (
    <div className="login--main1" style={styles}>
      <div className="card">
        <h6>Register</h6> 
        {!show && <p className="ep_account">Please enter your Details</p>}
        {show && (
          <p className="ep_acc">
            Email already registered . Go to &nbsp;
            <div className="login--route">
              <Link to="/login">Login</Link>
            </div>
            &nbsp; page
          </p>
        )}
        <form className="login_form">
          <div className="input_text">
            <input
              type="text"
              name="Email"
              onChange={handlesChange}
              value={item.Email}
              autoComplete="false"
            />
            <span>Email</span>
          </div>
          <div className="input_text">
            <input
              type="text"
              name="UserName"
              onChange={handlesChange}
              value={item.UserName}
            />
            <span>UserName</span>
          </div>
          <div className="input_text">
            <input
              type="text"
              name="Phone"
              onChange={handlesChange}
              value={item.Phone}
            />
            <span>Mobile</span>
          </div>
          <div className="input_text">
            <input
              type="password"
              name="Password"
              onChange={handlesChange}
              value={item.Password}
            />
            <span>Password</span>
          </div>
          <div className="input_text">
            <input
              type="text"
              name="College"
              onChange={handlesChange}
              value={item.College}
            />
            <span>College</span>
          </div>
          <div className="input_text">
            <input
              type="text"
              name="Address"
              onChange={handlesChange}
              value={item.Address}
            />
            <span>Address</span>
          </div>
          <div className="submit_button">
            <input
              type="submit"
              value={"Submit"}
              className="btn"
              onClick={handlesSubmit}
            />
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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
