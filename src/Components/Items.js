import React from "react";
import Product from "./product"; 
import NavBar from "./NavBar"; 
import '../styles/product.css'
export default function Items({AllItems,size,name,wishList,Admins}) { 
  return (
    <div className="main--page">
      <NavBar size={size} name={name} Admins={Admins}/>
      <section className="all--items">
        {
            AllItems.map((item,id) => (         
              <Product
                key={id}
                item={item}
                name={name}
                wishList={wishList}
              />
            ))
        }
      </section>
    </div>
  );
} 
