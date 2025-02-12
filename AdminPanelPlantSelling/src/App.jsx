import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import HomeDeliveryOrders from "./Components/HomeDeliveryOrders";
import DashboardLayout from "./Components/DashboardLayout";
import AdminContactQueries from './Components/AdminContactQueries';
import OrdersChartPage from './Components/CODOrderAnalysis';
import OnlineOrdersAnalysis from './Components/OnlineOrderAnalysis';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/home-delivery-orders" element={<HomeDeliveryOrders />} />
          <Route path='/contact-queries' element={<AdminContactQueries />} />
          <Route path='/orders-data' element={<OrdersChartPage />} />
          <Route path='/online-data' element={<OnlineOrdersAnalysis/>}/>
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
