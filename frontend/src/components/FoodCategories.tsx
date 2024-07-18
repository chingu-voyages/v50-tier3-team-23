import React, { useState , useEffect } from 'react';
import { Navbar } from "./navbar/Navbar";
import { Cart } from "./cart/Cart";
import  Main  from "./main/Main";
import  FoodCard  from "./foodCard/FoodCard";
import  Login  from "./login/Login";
import  Register  from "./register/Register";

export const FoodCategories = () => {
  const [productName, setProductName] = useState("pizzas");
  const [changePage, setChangePage] = useState(true);
  const [foodSelected, setFoodSelected] = useState("");
  const [foodSelectedIndex, setFoodSelectedIndex] = useState("");
  const [foodSelectedList, setFoodSelectedList] = useState("");
  const [noteRegister, setNoteRegister] = useState("true");
  const [noteLogin, setNoteLogin] = useState("false");
  const [noteFoodCard, setNoteFoodCard] = useState("false");
  const [noteMainPage, setNoteMainPage] = useState("false");


  useEffect (()=> {
    setNoteLogin(false);
    setNoteRegister(false);
    setNoteFoodCard(false);
    setNoteMainPage(true);

    },[] );
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full h-full">
      <div className=" lg:w-[70%] w-full">
        <h2 className="font-poppins-bold cursor-pointer inline-block relative select-none text-3xl"> </h2>


        <Navbar productName={productName} setProductName={setProductName} changePage={changePage} setChangePage={setChangePage}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}/>


        <Main productName={productName} setProductName={setProductName} changePage={changePage} setChangePage={setChangePage} 
        foodSelected={foodSelected} setFoodSelected={setFoodSelected} 
        foodSelectedIndex={foodSelectedIndex} setFoodSelectedIndex={setFoodSelectedIndex} 
        foodSelectedList={foodSelectedList} setFoodSelectedList={setFoodSelectedList}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}/>


      </div>
      <div className=" lg:w-[30%] ; , position:fixed;" >
    
        {/* <Cart /> */}
        {noteMainPage && <>
        <div className="containImage">
  
        <img src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600" className="updateVideo" />
        </div>
        <h2 className="updateImage">What Do You Like to Eat?</h2> </>}

       
       {noteFoodCard && <FoodCard foodSelected={foodSelected} setFoodSelected={setFoodSelected} 
        foodSelectedIndex={foodSelectedIndex} setFoodSelectedIndex={setFoodSelectedIndex} 
        foodSelectedList={foodSelectedList} setFoodSelectedList={setFoodSelectedList}/>}

        {noteRegister && <Register noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage} /> }
        {noteLogin && <Login noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}/> }
      </div>
    </div>
  );
};
