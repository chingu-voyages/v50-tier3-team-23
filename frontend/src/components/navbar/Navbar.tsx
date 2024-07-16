import React, { useState, useEffect } from 'react';
import "./navbar.css";

type NavbarProps = {
  categs: any;
  navbarHasSelected: Function;
};

export const Navbar:React.FC<NavbarProps> = (props) => {

  const {categs, navbarHasSelected} = props;

  const [selectedProduct, setSelectedProduct] = useState("");


  function createNavbarItems(productsCategories: string[]) {
    return productsCategories.map((prod, index) => (
      <div
        className={`product ${selectedProduct === prod ? 'selected' : ''}`}
        id={prod + index}
        key={index}
        onClick={() => {navbarHasSelected(prod) ; setSelectedProduct(prod)}}
      >
        {prod}
      </div>
    ));
  }


  return (
    <div>

      <div className='navbar'>
        <div className='iconDiv'>
          <img src="/src/assets/pictures/knife-fork-nutrition-food-128.svg" alt="fork and knife" width="24" height="24" />
        </div>
        <div className='menu-list'>
          {createNavbarItems(categs)}
        </div>
      
      </div>
    </div>
  );
};
