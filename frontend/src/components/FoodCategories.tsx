import React, { useState , useEffect } from 'react';
import { Navbar } from "./navbar/Navbar";
import Cart  from "./cart/Cart";
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
  const [noteRegister, setNoteRegister] = useState(true);
  const [noteLogin, setNoteLogin] = useState(false);
  const [noteFoodCard, setNoteFoodCard] = useState(false);
  const [noteMainPage, setNoteMainPage] = useState(false);
<<<<<<< HEAD:frontend/src/components/FoodCategories.tsx
=======
  const [noteBasket, setNoteBasket] = useState(false);
  const [noteMainFoodPage, setNoteMainFoodPage] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1224);
>>>>>>> temp-branch:restaurant-app/src/components/FoodCategories.tsx


  useEffect (()=> {
    localStorage.clear();
    setNoteLogin(false);
    setNoteRegister(false);
    setNoteFoodCard(false);
    setNoteBasket(false);
    setNoteMainFoodPage(false);
    setNoteMainPage(true);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1224);
    };

    const debounceResize = debounce(handleResize, 100);
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };

    },[] );
  return (
    <div >
      {isLargeScreen && (
        <>
      <div className=" w-[70%]">
        <h2 className="font-poppins-bold cursor-pointer inline-block relative select-none text-3xl"> </h2>


        <Navbar productName={productName} setProductName={setProductName} changePage={changePage} setChangePage={setChangePage}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        noteBasket={noteBasket} setNoteBasket={setNoteBasket}
        noteMainFoodPage={noteMainFoodPage} setNoteMainFoodPage={setNoteMainFoodPage}
        isLargeScreen={isLargeScreen} setIsLargeScreen={setIsLargeScreen}
        loggedOut={loggedOut} setLoggedOut={setLoggedOut}/>


        <Main productName={productName} setProductName={setProductName} changePage={changePage} setChangePage={setChangePage} 
        foodSelected={foodSelected} setFoodSelected={setFoodSelected} 
        foodSelectedIndex={foodSelectedIndex} setFoodSelectedIndex={setFoodSelectedIndex} 
        foodSelectedList={foodSelectedList} setFoodSelectedList={setFoodSelectedList}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        noteBasket={noteBasket} setNoteBasket={setNoteBasket}
        noteMainFoodPage={noteMainFoodPage} setNoteMainFoodPage={setNoteMainFoodPage}
        isLargeScreen={isLargeScreen} setIsLargeScreen={setIsLargeScreen}/>


      </div>
      <div className=" w-[30%] " >
        
        {noteBasket &&<Cart />}
        {noteMainPage && 
        <div className="containImage">
        <h2 className="updateImage">What Do You Like to Eat?</h2>
        
        </div>
         }

       
       {noteFoodCard && <FoodCard foodSelected={foodSelected} setFoodSelected={setFoodSelected} 
        foodSelectedIndex={foodSelectedIndex} setFoodSelectedIndex={setFoodSelectedIndex} 
        foodSelectedList={foodSelectedList} setFoodSelectedList={setFoodSelectedList}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        noteBasket={noteBasket} setNoteBasket={setNoteBasket}/>}

        {noteRegister && <Register noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage} /> }

        
        {noteLogin && <Login noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        loggedOut={loggedOut} setLoggedOut={setLoggedOut}/> }
      </div>
       </>)}


       {!isLargeScreen && (
        <>
      
        <h2 className="font-poppins-bold cursor-pointer inline-block relative select-none text-3xl"> </h2>


        <Navbar productName={productName} setProductName={setProductName} changePage={changePage} setChangePage={setChangePage}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        noteBasket={noteBasket} setNoteBasket={setNoteBasket}
        noteMainFoodPage={noteMainFoodPage} setNoteMainFoodPage={setNoteMainFoodPage}
        isLargeScreen={isLargeScreen} setIsLargeScreen={setIsLargeScreen}
        loggedOut={loggedOut} setLoggedOut={setLoggedOut}/>


        {noteMainFoodPage &&<Main productName={productName} setProductName={setProductName} changePage={changePage} setChangePage={setChangePage} 
        foodSelected={foodSelected} setFoodSelected={setFoodSelected} 
        foodSelectedIndex={foodSelectedIndex} setFoodSelectedIndex={setFoodSelectedIndex} 
        foodSelectedList={foodSelectedList} setFoodSelectedList={setFoodSelectedList}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        noteBasket={noteBasket} setNoteBasket={setNoteBasket}
        noteMainFoodPage={noteMainFoodPage} setNoteMainFoodPage={setNoteMainFoodPage}
        isLargeScreen={isLargeScreen} setIsLargeScreen={setIsLargeScreen}/> }


       {noteMainPage && <>
        <div className="containImage" style={{  width: '100%'}}>
  
        
        </div>
        <h2 className="updateImage">What Do You Like to Eat?</h2> </>}
      
        
        {noteBasket &&<Cart />}
        

       
       {noteFoodCard && <FoodCard foodSelected={foodSelected} setFoodSelected={setFoodSelected} 
        foodSelectedIndex={foodSelectedIndex} setFoodSelectedIndex={setFoodSelectedIndex} 
        foodSelectedList={foodSelectedList} setFoodSelectedList={setFoodSelectedList}
        noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        noteBasket={noteBasket} setNoteBasket={setNoteBasket}/>}

        {noteRegister && <Register noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage} /> }

        
        {noteLogin && <Login noteRegister={noteRegister} setNoteRegister={setNoteRegister}
        noteLogin={noteLogin} setNoteLogin={setNoteLogin}
        noteFoodCard={noteFoodCard} setNoteFoodCard={setNoteFoodCard}
        noteMainPage={noteMainPage} setNoteMainPage={setNoteMainPage}
        loggedOut={loggedOut} setLoggedOut={setLoggedOut}/> }
      
       </>)}
    </div>
  );
};
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}