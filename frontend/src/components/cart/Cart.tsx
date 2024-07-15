import React, { useEffect, useState } from "react";
import { CartItem } from "./Cart-Item";
import "../../App.css";
import { createUser, getAllUsers } from "../../utils/actions";
export const Cart = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUsers] = useState([]);

  useEffect(() => {
    showUsers();
  }, []);

  useEffect(() => {
    console.log("users: ", user);
  }, [user]);

  const showUsers = async () => {
    const response = await getAllUsers();
    setUsers(response);
  };

  const handleSubmit = async (e) => {
    await createUser(email, name);
  };

  return (
    <div className="flex border w-full relative">
      <div className="">
        <div className="flex w-full">
          Hello,{" "}
          {user && user.map(({ name, id }) => <div key={id}>{name}</div>)}
        </div>
      </div>
      <form className="border-black border-2">
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
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
              <button className="px-10 py-2 bg-blue-600 rounded-full text-white">
                Payment
              </button>
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
