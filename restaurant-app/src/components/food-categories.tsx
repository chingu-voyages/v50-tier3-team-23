import React from "react";
import { Navbar } from "./navbar/Navbar";
import { Cart } from "./cart";

export const FoodCategories = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full h-full">
      <div className=" flex-1">
        <Navbar />
      </div>
      <div className=" lg:w-[40%] w-full">
        <Cart />
      </div>
    </div>
  );
};
