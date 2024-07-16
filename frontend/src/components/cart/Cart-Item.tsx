import React, { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { FaCirclePlus } from "react-icons/fa6";
import { CiCircleMinus } from "react-icons/ci";

type CartItemsProps = {
    food: string,
    foodprice: number,
}
export const CartItem = ({food, foodprice} : CartItemsProps) => {
    const [counter, setCounter] = useState(0)
    const [price, setPrice] = useState(foodprice)
    const addFunction = () => {
      setCounter(counter + 1)
      setPrice(prevPrice => parseFloat((prevPrice + foodprice).toFixed(2)))
    }
    const subtractFunction = () => {
        if(counter > 0){
            setCounter(counter - 1)
            setPrice(prevPrice => parseFloat((prevPrice - foodprice).toFixed(2)))
        }
    }
  return (
    <div className="flex items-center w-full">
      <div className="w-full flex items-center justify-between py-2 border-b border-b-gray-300">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">{food}</h1>
          <div className="flex gap-2 items-center">
            <GrNotes className=" text-gray-400" />
            <p className="text-gray-400">Note...</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">${price}</p>
          <div className="flex items-center gap-2">
            <button onClick={subtractFunction}>
              <CiCircleMinus className="text-3xl" />
            </button>
            <p>{counter}</p>
            <button onClick={addFunction}>
              <FaCirclePlus className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
