import React, { useCallback, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCookies } from "react-cookie";
//@ts-ignore
const stripekey = import.meta.env.VITE_STRIPE_LOAD_KEY;
if (!stripekey) {
  throw new Error("STRIPE_LOAD_KEY environment variable is not set");
}
interface BasketItem {
  foodSelected: {
    img: string;
    name: string;
    dsc?: string;
    price: number;
  };
  quantity: number;
  foodSelectedIndex?: number;
  foodSelectedList?: string;
  token?: string;
}
const stripePromise = loadStripe(stripekey);
export const CheckoutPage = () => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const [checkOutItem, setCheckOutItem] = useState([{
    product_data: {
       name: "Burger"
   },
   unit_amount: 2000,
   quantity: 1
},])

  useEffect(() => {
    const userEmail = cookie.Email;
    const authToken = cookie.AuthToken;
    if (authToken) {
      setIsLoggedIn(true);
      const existingBasket = localStorage.getItem('basket');
      console.log(existingBasket);
      if (existingBasket) {
        const parsedBasket = JSON.parse(existingBasket);
        setBasketItems(parsedBasket);
      }
    }
  }, []);


  const fetchClientSecret = useCallback(() => {
      console.log('Basket items:', basketItems);

    const newCheckoutItem = [
      ...basketItems.map((item) => (
        {
          product_data: {
            name: item.foodSelected.name,
          },
          unit_amount: item.foodSelected.price * 100,
          quantity: item.quantity,
        }
      ))
    ]
    return fetch(
      //@ts-ignore
      `${import.meta.env.VITE_APP_PUBLIC_SERVER_URL}/create-checkout-session`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newCheckoutItem)
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [basketItems]);
  
  const options = { fetchClientSecret };

  return (
    <>
      {basketItems.length > 0 && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </>
  );
};
