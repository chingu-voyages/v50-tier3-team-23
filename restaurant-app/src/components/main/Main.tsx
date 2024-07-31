import React from 'react';
import { useState , useEffect } from 'react'
import axios from "axios";
import "./Main.css"; // Make sure to import the CSS


  const Main = ({ productName, setProductName ,changePage, setChangePage ,foodSelected, setFoodSelected, 
    foodSelectedIndex, setFoodSelectedIndex, 
    foodSelectedList, setFoodSelectedList,
    noteRegister, setNoteRegister,
    noteLogin, setNoteLogin,
    noteFoodCard, setNoteFoodCard,
    noteMainPage, setNoteMainPage,
    noteBasket, setNoteBasket,
    noteMainFoodPage, setNoteMainFoodPage,
    isLargeScreen, setIsLargeScreen}) => {
    const [foodData, setFoodData] = useState([]);
    
  
    useEffect (()=> {
     
      const fetchData = async()=> {
        const {data} = await axios.get(`https://menus-api.vercel.app/`);
        console.log(data);
        setFoodData(data[productName]);
        console.log(data[productName]);
        
        
      };
     
      fetchData();
  
      },[changePage] );


      function handleFoodClick(food, index, productName) {
        
        setNoteMainFoodPage(false);
     
        setFoodSelected(food);
        setFoodSelectedIndex(index);
        setFoodSelectedList(productName)
        setNoteLogin(false);
        setNoteRegister(false);
        setNoteFoodCard(true);
        setNoteMainPage(false);
        setNoteBasket(false);
      }
    
  
    return (
      <div className="container">
        {foodData.map((food, index) => (
          <div className="card" key={index} onClick={() => handleFoodClick(food, index, productName)}>
            <img src={food.img} alt={food.name} />
            <div className="card-title">{food.dsc}</div>
          </div>
        ))}
      </div>
    );
  };
  

export default Main;