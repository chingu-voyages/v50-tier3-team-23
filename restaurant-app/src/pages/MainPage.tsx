import React, { useState, useEffect } from "react";
import Right from '../components/Right';
import Left from '../components/Left';

const ALLOWED_CATEGS = ["burgers", "fried-chicken", "bbqs", "pizzas", "drinks", "desserts"];

export const MainPage = () => {
  
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetch("https://menus-api.vercel.app/")
    .then((response) => response.json())
    .then(data => {
      const filtered_products = {};
      for(const key in data) {
        if (ALLOWED_CATEGS.includes(key)) {
          filtered_products[key] = data[key];
        }
      }
      setData(filtered_products);      
    })
    .catch(err =>  console.log(err));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full h-full">
      <Left data={data}></Left>
      <Right></Right>
    </div>
  );
};
