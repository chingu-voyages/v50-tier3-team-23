import React from 'react';
import { useState , useEffect } from 'react'
// import { API_URL } from "../consts";
import axios from "axios";
import "./FoodCard.css"; 
import { useCookies } from 'react-cookie';



  const FoodCard = ({foodSelected, setFoodSelected, 
    foodSelectedIndex, setFoodSelectedIndex, 
    foodSelectedList, setFoodSelectedList,
    noteRegister, setNoteRegister,
    noteLogin, setNoteLogin,
    noteFoodCard, setNoteFoodCard,
    noteMainPage, setNoteMainPage,
    noteBasket, setNoteBasket }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [cookie, setCookie, removeCookie] = useCookies();

    
    const clickBasketPage = ()=>{
      setNoteLogin(false);
      setNoteRegister(false);
      setNoteFoodCard(false);
      setNoteMainPage(false);
      setNoteBasket(true);
    }
  
    const handleAddToBasket = async (event: React.FormEvent) => {
      event.preventDefault();
      const token = localStorage.getItem('token'); 
      const userEmail = cookie.Email;
      const authToken = cookie.AuthToken;// Assuming the token is stored in localStorage
      if (authToken) {
        // User is logged in, save to localStorage
        const basketItem = {
          foodSelected,
          quantity,
          foodSelectedIndex,
          foodSelectedList,
          token,
        };

        console.log(basketItem);
  
        // Get existing basket items from localStorage
        const existingBasket = localStorage.getItem('basket');
        const basket = existingBasket ? JSON.parse(existingBasket) : [];
  
        const existingItemIndex = basket.findIndex(
          item => item.foodSelectedIndex === foodSelectedIndex && item.foodSelectedList === foodSelectedList
        );
  
        if (existingItemIndex !== -1) {
          // Item exists, update the quantity
          basket[existingItemIndex].quantity += quantity;
        } else {
          // Add new item to the basket
          basket.push(basketItem);
        }
        console.log(basket);
  
        // Save updated basket to localStorage
        localStorage.setItem('basket', JSON.stringify(basket));
      } else {
        // User is not logged in, handle accordingly (e.g., redirect to login page)
        console.log('User not logged in. Redirecting to login page...');
      }

    }
    
  
  
    return (
      
        <div className="container"  id="containerFoodCard">
          <div className="col" id="containerFoodCardInside">
            <div className="row-md-2"  id="containerImageCard">
              <img src={foodSelected.img} className="img-fluid" alt="" id="imageInside" />
            </div>
            <div className="row-md-3" id="containerContentCard">
              <h1>{foodSelected.name}</h1>
              <p>{foodSelected.dsc}</p>
              <h2>£{foodSelected.price}</h2>
            
              <form onSubmit={handleAddToBasket}>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label" id="imageCard">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
                <button type="submit" className="btn btn-outline-secondary" style={{ width: '35%', marginRight:'1em' }}>Add to Basket</button>
                <button  className="btn btn-outline-secondary" onClick={clickBasketPage} style={{ width: '35%', marginRight:'1em' }}>Go to Basket</button>
              </form>
              
            
            </div>
          </div>
        </div>
  
    
   
    );
  };
  
  export default FoodCard;