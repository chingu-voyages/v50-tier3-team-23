import React, { useCallback } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
const stripekey = import.meta.env.VITE_STRIPE_LOAD_KEY;
if(!stripekey){
  throw new Error('STRIPE_LOAD_KEY environment variable is not set');
}

const stripePromise = loadStripe(stripekey);
export const CheckoutPage = () => {
    const fetchClientSecret = useCallback(() => {
        return fetch("http://localhost:8000/create-checkout-session", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data.clientSecret);
      }, []);
    
      const options = {fetchClientSecret};
  return (
    <EmbeddedCheckoutProvider
    stripe={stripePromise}
    options={options}
  >
    <EmbeddedCheckout />
  </EmbeddedCheckoutProvider>
  )
}
