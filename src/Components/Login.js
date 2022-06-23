import "../styles/Login.css";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login  from "../photos/login.jpg"
import { config } from "../config";
export default function Login() {
  const [item, Setitem] = useState({
    UserName: "",
    Password: "",
  });

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
      UserName: item.UserName,
      Password: item.Password,
    };
    let response = await fetch(`${config.server_url}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVal),
    });
    let result = await response.json();
    console.log(result);
    if (result.length > 0) {
      fetch(`${config.server_url}user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newVal),
      });
      toast.success("login SuccessFul");
      setTimeout(()=>{
        //  eslint-disable-next-line no-lone-blocks
        {
          routeChange("/MainPage");
        }
      },800)
    } else {
      toast.error("UserName/Password Incorrect");
    }
  }
  const styles={
    backgroundImage:`url(${login})`
  }
  return (
    <div className="login--main" style={styles}> 
      <div className="card">
        <h6>Welcome User! </h6>
        <br/>
        <form autoComplete="false" className="login_form"> 
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
              type="password"
              name="Password"
              onChange={handlesChange}
              value={item.Password}
              // autoComplete="off"
            />
            <span>Password</span>
          </div>
          <div className="submit_button">
            <input
              type="submit"
              value={"Login"}
              className="btn"
              onClick={handlesSubmit}
            />
          </div>
          <div className="login--last">
            <div className="ep_account1">Don't have an account?</div>
            <div className="register">
              <Link to="/register" className="register--button">
                Register Here
              </Link>
            </div>
            <div className="clear"></div>
          </div>
        </form>
      </div>
      <ToastContainer 
          position="top-center"
          autoClose={800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
       />
    </div>
  );
}
