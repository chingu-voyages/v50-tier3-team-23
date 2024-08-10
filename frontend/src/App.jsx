import "./App.css";
import { FoodCategories } from "./components/FoodCategories.tsx";
import { Routes, Route } from "react-router-dom";
import { ReturnPage } from "./components/stripe/ReturnPage.tsx";
import { CheckoutPage } from "./components/stripe/CheckoutPage.tsx";
import Cart  from "./components/cart/Cart.tsx";
import Main from "./components/main/Main.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FoodCategories />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/return" element={<ReturnPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
