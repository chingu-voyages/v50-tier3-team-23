import React from 'react';
import { useState , useEffect } from 'react'
import axios from "axios";
import "./Main.css";

type FoodData = {
  id: number;
  name: string;
  img: string;
  dsc: string;
  price: number;
  category: string;
}
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
    const [foodData, setFoodData] = useState<FoodData[]>([]);
    
  
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
    
      const defaultImage = "/utensils.jpg"
  
    return (
      <div className="container">
        {foodData.map((food, index) => (
          <div className="card" key={index} onClick={() => handleFoodClick(food, index, productName)}>
            <img src={food.img || defaultImage} alt={food.name}  onError={(e : any) => { e.target.src = defaultImage; }}  />
            <div className="card-title">{food.dsc}</div>
          </div>
        ))}
      </div>
    );
  };
  

export default Main;