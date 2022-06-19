import noStar from "../photos/noStar.png";
import star from "../photos/star.jpg";
import "../styles/product.css";
import { config } from "../config";
// import { useAlert } from 'react-alert'
export default function Product({ item, name, wishList }) {
  let { Img, Title, Director, Price, Favourite } = item;
  function AddToCart() {
    if (name === "Login") {
      alert("First login inorder to add the item to cart");
    } else {
      const newModel = {
        Img: item.Img,
        Title: item.Title,
        Count: item.Count,
        Price: item.Price,
        user: name,
        where: "cart",
      };
      fetch(`${config.server_url}MainPage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModel),
      }).then();
    }
  }

  function AddToWishList(newVal) {
    fetch(`${config.server_url}MainPage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVal),
    }).then();
  }

  function RemoveFromWishList(newVal) {
    fetch(`${config.server_url}MainPage/${newVal.Title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVal),
    });
  }

  function Is_There(Title) {
    const found = wishList.some((Obj) => Obj.Title === Title);
    return found;
  }

  function TogglePhoto(Title) {
    if (name === "Login") {
      alert("First login inorder to add the item to wishlist");
    } else {
      const newVal = {
        Img: item.Img,
        Title: item.Title,
        Favourite: item.Favourite,
        Count: item.Count,
        Price: item.Price,
        user: name,
        where: "wishList",
      };
      if (!item.Favourite) AddToWishList(newVal);
      else RemoveFromWishList(newVal);
      fetch(`${config.server_url}MainPage/${Title}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVal),
      });
      console.log("came");
    }
  }
  return (
    <div className="product--main">
      <div className="product--img">
        <img src={Img} alt="vamshi" />
        <div className="product--favourite">
          <img
            onClick={() => TogglePhoto(Title)}
            src={Is_There(Title) ? star : noStar}
            alt="vamshi"
          />
        </div>
      </div>
      <div className="product--details">
        <p className="product--title">{Title}</p>
        <p className="product--author">{Director}</p>
        <p className="product--price">Price - ${Price}</p>
        <div className="product--last">
          <div className="AddToCart" onClick={() => AddToCart(Title)}>
            Book Tickets
          </div>
        </div>
      </div>
    </div>
  );
}
