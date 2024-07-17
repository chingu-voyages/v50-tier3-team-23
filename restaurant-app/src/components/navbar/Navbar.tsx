import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./navbar.css";


export const Navbar = ({ productName, setProductName ,changePage, setChangePage,
  noteRegister, setNoteRegister,
  noteLogin, setNoteLogin,
  noteFoodCard, setNoteFoodCard,
  noteMainPage, setNoteMainPage}) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const products: string[] = ["pizzas", "burgers", "porks", "fried-chicken", "steaks", "desserts"];
  const [loggedOut, setLoggedOut] = useState(true);

  

  function handleProductClick(product: string) {
    setSelectedProduct(product);
    setProductName(product);
    setChangePage(!changePage)
  }
  const clickLoginPage = ()=>{
    setNoteLogin(true);
    setNoteRegister(false);
    setNoteFoodCard(false);
    setNoteMainPage(false);
  }

  const clickRegisterPage = ()=>{
    setNoteLogin(false);
    setNoteRegister(true);
    setNoteFoodCard(false);
    setNoteMainPage(false);
  }

  const clickMainPage = ()=>{
    setNoteLogin(false);
    setNoteRegister(false);
    setNoteFoodCard(false);
    setNoteMainPage(true);
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

  // return (
  //   <div className='navbar'>
      
      
  //     <div className='iconDiv'>
  //       <img src="/src/assets/pictures/knife-fork-nutrition-food-128.svg" alt="fork and knife" width="24" height="24" />
  //     </div>
     

  //     <div className='menu-list'>
  //     <ul className="navbar-nav">
  //     <ul className="nav-item dropdown">
  //     <a
  //       className="nav-link dropdown-toggle"
  //       href="#"
  //       role="button"
  //       data-bs-toggle="dropdown"
  //       aria-expanded="false"
  //     >
  //       <i className="fa fa-user" aria-hidden="true"></i>
  //     </a>
  //     <ul className="dropdown-menu">
  //       <li><a className="dropdown-item" href="#">My Account</a></li>
  //       <li><a className="dropdown-item" href="#">My Order</a></li>
  //       <li><hr className="dropdown-divider" /></li>
  //       {loggedOut ? (
  //         <>
  //           <li className="dropdown-item">
              
  //             Login
              
  //           </li>
  //           <li className="dropdown-item">
          
  //         Register
          
  //           </li>
  //         </>
  //       ) : (
  //         <li className="dropdown-item">
            
  //           Logout
            
  //         </li>
  //       )}
  //     </ul>
  //   </ul>
  //       {createNavbarItems(products)}
  //       </ul>
  //     </div>
  //   </div>
  // );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={clickMainPage} >
          {/* <img src="/src/assets/pictures/knife-fork-nutrition-food-128.svg" alt="fork and knife" width="24" height="24" /> */}
          <img src="https://cdn-icons-png.flaticon.com/128/1046/1046857.png" alt="fork and knife" width="24" height="24" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-user" aria-hidden="true"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">My Account</a></li>
                <li><a className="dropdown-item" href="#">My Order</a></li>
                <li><hr className="dropdown-divider" /></li>
                {loggedOut ? (
                  <>
                    <li className="dropdown-item" onClick={clickLoginPage}><a href="#">Login</a></li>
                    <li className="dropdown-item" onClick={clickRegisterPage}><a href="#">Register</a></li>
                  </>
                ) : (
                  <li className="dropdown-item"><a href="#">Logout</a></li>
                )}
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu-list">
            {createNavbarItems(products)}
          </ul>
          
        </div>
      </div>
    </nav>
  );
  
};
