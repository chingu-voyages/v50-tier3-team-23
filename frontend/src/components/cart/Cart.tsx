import "../../App.css";
import AuthPage from "../AuthPage";
import React from "react";
import { CartItem } from "./Cart-Item";
import { checkOut } from "../../utils/actions";
import { CheckoutPage } from "../stripe/CheckoutPage";
import { Link } from "react-router-dom";

export const Cart = () => {
  return (
    <div className="flex border w-full relative">
      <AuthPage />
      <div className="w-full">
        <div
          className=" w-full h-[30vh]"
          style={{
            backgroundImage: `url("/burger.jpg")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="px-6 py-6 h-[70vh] bg-slate-100">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full border-b border-b-gray-300 py-2 mb-4">
              <h2 className="text-2xl font-semibold">Order List</h2>
              <p>Total Items: {OrderList.length}</p>
            </div>
            <div className="w-full h-[40vh] overflow-y-scroll hide-scrollbar  flex flex-col gap-4">
              {OrderList.map((list, id) => (
                <CartItem food={list.food} foodprice={list.price} key={id} />
              ))}
            </div>
          </div>
          <div className=" w-full flex mt-2 px-6 py-5 rounded-r-3xl bg-gray-300">
            <div className="flex items-center justify-between w-full">
              <p>Total: $25.96</p>
              <Link to="/checkout">
                <button className="px-10 py-2 bg-blue-600 rounded-full text-white">
                  Pay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderList = [
  { food: "Prime Beef", price: 6.99 },
  { food: "Cheesy Chicken Bacon", price: 7.99 },
  { food: "Half - Half Ocean Mania & Meat Lovers", price: 7.99 },
  { food: "Cocacola", price: 2.99 },
];
