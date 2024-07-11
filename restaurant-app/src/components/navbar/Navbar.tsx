import React, { useState } from 'react';
import "./navbar.css";

export const Navbar = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const products: string[] = ["Pizza", "Pasta", "Burgers", "Soup", "Appetizers", "Salad", "Beverage", "Dessert"];

  function handleProductClick(product: string) {
    setSelectedProduct(product);
  }

  function createNavbarItems(products: string[]) {
    return products.map((prod, index) => {
      return (
        <div
          className={`product ${selectedProduct === prod ? 'selected' : ''}`}
          id={prod + index}
          key={index}
          onClick={() => handleProductClick(prod)}
        >
          {prod}
        </div>
      );
    });
  }

  return (
    <div className='navbar'>
      <div className='iconDiv'>
        <img src="/src/assets/pictures/knife-fork-nutrition-food-128.svg" alt="fork and knife" width="24" height="24" />
      </div>
      <div className='menu-list'>
        {createNavbarItems(products)}
      </div>
    </div>
  );
};
