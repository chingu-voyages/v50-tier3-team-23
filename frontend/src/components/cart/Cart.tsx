// import React, { useState } from "react";
// import { CartItem } from "./Cart-Item";
// import "../../App.css"
// export const Cart = () => {

//   return (
//     <div className="flex border w-full ">
//       <div className="w-full">
//         <div
//           className=" w-full h-[30vh]"
//           style={{
//             backgroundImage: `url("/burger.jpg")`,
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//           }}
//         ></div>
//         <div className="px-6 py-6 h-[70vh] bg-slate-100">
//           <div className="flex flex-col items-center justify-center">
//             <div className="flex items-center justify-between w-full border-b border-b-gray-300 py-2 mb-4">
//               <h2 className="text-2xl font-semibold">Order List</h2>
//               <p>Total Items: {OrderList.length}</p>
//             </div>
//             <div className="w-full h-[40vh] overflow-y-scroll hide-scrollbar  flex flex-col gap-4">
//               {OrderList.map((list, id) => (
//                 <CartItem food={list.food} foodprice={list.price} />
//               ))}
//             </div>
//           </div>
//           <div className=" w-full flex mt-2 px-6 py-5 rounded-r-3xl bg-gray-300">
//             <div className="flex items-center justify-between w-full">
//               <p>Total: $25.96</p>
//               <button className="px-10 py-2 bg-blue-600 rounded-full text-white">Payment</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OrderList = [
//   {food: "Prime Beef",price: 6.99},
//   {food: "Cheesy Chicken Bacon",price: 7.99},
//   {food: "Half - Half Ocean Mania & Meat Lovers",price: 7.99},
//   {food: "Cocacola",price: 2.99},
// ]


import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

interface BasketItem {
  foodSelected: {
    img: string;
    name: string;
    dsc: string;
    price: number;
  };
  quantity: number;
  foodSelectedIndex: number;
  foodSelectedList: string;
  token: string;
}

const Cart: React.FC = () => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const userEmail = cookie.Email;
    const authToken = cookie.AuthToken;  
    if (authToken) {
      setIsLoggedIn(true);
      const existingBasket = localStorage.getItem('basket');
      if (existingBasket) {
        const parsedBasket = JSON.parse(existingBasket);
        setBasketItems(parsedBasket);
        calculateTotal(parsedBasket);
      }
    }
  }, [basketItems]);

  const calculateTotal = (items: BasketItem[]) => {
    const total = items.reduce((sum, item) => sum + item.foodSelected.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const updatedBasket = [...basketItems];
    updatedBasket[index].quantity = quantity;
    setBasketItems(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    calculateTotal(updatedBasket);
  };

  const handleRemoveItem = (index: number) => {
    const updatedBasket = basketItems.filter((_, i) => i !== index);
    setBasketItems(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    calculateTotal(updatedBasket);
  };


return (
  <div className="cart-container">
    <div className="container mt-3" style={{ minHeight: '85vh' }}>
      {isLoggedIn ? (
        basketItems.length > 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  {/* <th className="favoritName">Name</th> */}
                  <th>Quantity</th>
                  {/* <th>Price</th> */}
                  <th className="favoritSubtotal">Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {basketItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.foodSelected.img} className="img-fluid" style={{ width: '100px',minWidth:'70px' }} alt={item.foodSelected.name} />
                    </td>
                    {/* <td className="favoritName">{item.foodSelected.name}</td> */}
                    <td >
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="form-control"
                        style={{ display: 'inline-block', width: '100%',minWidth:'80px' }}
                        onChange={(e) => handleUpdateQuantity(index, Number(e.target.value))}
                      />
                    </td>
                    {/* <td>£{item.foodSelected.price}</td> */}
                    <td className="favoritSubtotal">£{item.foodSelected.price * item.quantity}</td>
                    <td>
                      <button className="btn btn-outline-secondary" onClick={() => handleRemoveItem(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="text-end">
                    <strong>Total</strong>
                  </td>
                  <td colSpan={2}>£{totalPrice}</td>
                </tr>
              </tbody>
            </table>
            <div className="d-grid gap-2">
              <Link to="/checkout" className='btn btn-outline-secondary' style={{height: '50px'}}>Proceed to Checkout</Link>
            </div>
          </>
        ) : (
          <div className="btn btn-outline-secondary" style={{ width: '100%' , height:'100%' }}>
            Your basket is empty.
          </div>
        )
      ) : (
        <div className="btn btn-outline-secondary" style={{ width: '100%', height:'100%' }}>
          You are not logged in.
        </div>
      )}
    </div>
  </div>
);
};

export default Cart;
