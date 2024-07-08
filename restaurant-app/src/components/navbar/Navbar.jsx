import React, { useState } from 'react';
import "./navbar.css";
import Icon from '/src/assets/knife-fork-nutrition-food-128.svg';

export const Navbar = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = ["Pizza", "Pasta", "Burgers", "Soup", "Appetizers", "Salad", "Beverage", "Dessert"];

  function handleProductClick(product) {
    setSelectedProduct(product);
  }

  function createNavbarItems(products) {
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
        <img src={Icon} alt="fork and knife" width="24" height="24" />
      </div>
      <div className='menu-list'>
        {createNavbarItems(products)}
      </div>
    </div>
  );
};
