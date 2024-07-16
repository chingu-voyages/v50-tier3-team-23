import React, { useCallback } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PcseeRowLO89tu0fk8LduxUbNsfGukGd3DYowEuuuf8OEIFQnWDTHf4MMVDvrPS08gTO7MUghrkWeJ6RrvTVfHY00ICgCLBXs"
);
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
