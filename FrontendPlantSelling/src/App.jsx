import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import './App.css';
import AllPages from "./Components/AllPages";
import ProductDetails from "./Components/ProductDetails";
import FloatingCart from "./Components/FloatingCart"; 
import ShopPage from "./pages/ShopPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import PaymentOptionsPage from "./pages/PaymentOptionsPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import RazorpayPage from "./pages/RazorpayPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AllPages />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/shopNow" element={<ShopPage />} />
          <Route path="/orderSummary" element={<OrderSummaryPage />} />
          <Route path="/customerdetials" element={<CustomerDetailsPage />} />
          <Route path="/paymentoptions" element={<PaymentOptionsPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/razorpay" element={<RazorpayPage/>}/>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
