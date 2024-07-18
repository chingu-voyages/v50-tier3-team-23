import React from 'react';
import { useState , useEffect } from 'react'
// import { API_URL } from "../consts";
import axios from "axios";
import "./FoodCard.css"; 

// const foodSelected = {
//     id:1,
//     name: "kabab", 
//     description: "delicious",
//     price: 127,
//     image:"https://goldbelly.imgix.net/uploads/showcase_media_asset/image/110906/bo-ssam-dinner-for-4.c4a32e8801e2f0283e0565bbe8493149.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
// }
  

  const FoodCard = ({foodSelected, setFoodSelected, 
    foodSelectedIndex, setFoodSelectedIndex, 
    foodSelectedList, setFoodSelectedList }) => {
    const [quantity, setQuantity] = useState<number>(1);
    
  
    const handleAddToBasket = async (event: React.FormEvent) => {
      event.preventDefault();
      
      try {
        // const {data} = await axios.post(`${API_URL}/addtobasket/${foodSelected.id}`, { quantity });
        const {data} = await axios.post(`http://localhost:5173/addtobasket/${foodSelectedList}/${foodSelectedIndex}`, { quantity });
      

    }catch(err){
        
        console.log(err);
        
    }};
    
  
  
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
                <button type="submit" className="btn btn-outline-secondary">Add to Basket</button>
              </form>
  
            
            </div>
          </div>
        </div>
  
    
   
    );
  };
  
  export default FoodCard;