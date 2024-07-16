import './App.css'
import { FoodCategories } from './components/FoodCategories.tsx'
import { Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import { ReturnPage} from './components/stripe/ReturnPage.tsx'
import { CheckoutPage } from './components/stripe/CheckoutPage.tsx'
import { Cart } from './components/cart/Cart.tsx'

function App() {

  return (
    <>
          <Routes>
            <Route path="/" element={<FoodCategories />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/return" element={<ReturnPage />} />
          </Routes>
    </>
  )
}

export default App
