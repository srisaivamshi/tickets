import "../styles/NavBar.css";
import { NavLink, Link } from "react-router-dom";
export default function NavBar({ size,name,Admins }) {
  const path=name==='Login'?`/login`:`/user/${name}`;
  return ( 
    <nav>
      <div className="nav--main"> 
        <Link to="/MainPage" style={{ textDecoration: "none" }}>
          <div className="nav--head">JustTickets</div>
        </Link>
        <div className="nav--sec">
        <Link to="/MainPage" style={{ textDecoration: "none" }}>
            <div className="nav--home"> <span className="span--second">Home</span>&nbsp;
            <i className="fa fa-home" aria-hidden="true"></i>
            </div> 
          </Link>
          <Link to="/wishlist" style={{ textDecoration: "none" }}> 
            <div className="nav--wish"> <span className="span--second">Wishlist</span>&nbsp;
            <i className="fa fa-heart" aria-hidden="true"></i>
            </div>
          </Link>
          <div className="nav--cart">
            <NavLink to="/cart" style={{ color: "red",textDecoration: "none" }}>
              <span>
                <span className="span--second">Cart</span>&nbsp;<i className="fas fa-shopping-cart"></i>
              </span>
              <span className="span--third">{size}</span>
            </NavLink>
          </div>
          <Link to={path} style={{ textDecoration: "none" }}>
            <div className="nav--admin"> <span className="span--second">{name}</span>&nbsp;<i className="fa fa-user-circle" aria-hidden="true"></i></div>
          </Link>
          {
            Admins&&
            <Link to="/admin" style={{ textDecoration: "none" }}>
            <div className="nav--admin"> <span className="span--second">Admin</span>&nbsp; <i className='fas fa-user-tie'></i> </div>
          </Link>
          }
        </div>
      </div>
    </nav>
  );
}
