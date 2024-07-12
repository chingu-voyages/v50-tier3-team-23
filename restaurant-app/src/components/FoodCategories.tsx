import React, { useState } from "react";
import { Navbar } from "./navbar/Navbar";
import { Cart } from "./cart/Cart";
import { Product } from "./Product";

export const FoodCategories = () => {
  
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full h-full">
      <div className=" flex-1">
        <h2 className="font-poppins-bold cursor-pointer inline-block relative select-none text-3xl">What you like ? </h2>
        <Navbar />

      </div>
      <div className=" lg:w-[25%] w-full">
        <Cart />
      </div>
    </div>
  );
};
