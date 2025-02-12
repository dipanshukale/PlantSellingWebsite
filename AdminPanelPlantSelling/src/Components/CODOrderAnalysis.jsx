import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const OrdersChartPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [clickedValue, setClickedValue] = useState(null); // New state for clicked value

  // Fetch orders data from backend API
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("https://plantsellingwebsite-backend.onrender.com/Cash-on-delivery-orders");
        setOrderData(response.data.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  // Prepare data for charts
  const paidUnpaidData = [
    { name: 'paid', value: orderData.filter(order => order?.paymentStatus === 'paid').length },
    { name: 'unpaid', value: orderData.filter(order => order?.paymentStatus === 'unpaid').length },
  ];

  const deliveredData = [
    { name: 'Delivered', value: orderData.filter(order => order.orderStatus === 'Delivered').length },
    { name: 'Not Delivered', value: orderData.filter(order => order.orderStatus !== 'Delivered').length },
  ];

  const monthlyOrderData = orderData.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
    const found = acc.find(item => item.month === month);
    if (found) {
      found.orders += 1;
    } else {
      acc.push({ month, orders: 1 });
    }
    return acc;
  }, []);

  const monthlyRevenueData = orderData.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
    const found = acc.find(item => item.month === month);
    if (found) {
      found.revenue += order.totalAmount;
    } else {
      acc.push({ month, revenue: order.totalAmount });
    }
    return acc;
  }, []);

  const categoryData = orderData.reduce((acc, order) => {
    order.cart.forEach(item => {
      const found = acc.find(category => category.name === item.category);
      if (found) {
        found.orders += item.quantity;
      } else {
        acc.push({ name: item.category, orders: item.quantity });
      }
    });
    return acc;
  }, []);

  const averageOrderValueData = monthlyRevenueData.map(monthData => ({
    ...monthData,
    avgOrderValue: monthData.revenue / orderData.filter(order => new Date(order.createdAt).toLocaleString('default', { month: 'short' }) === monthData.month).length,
  }));

  const orderStatusData = [
    { name: 'Created', value: orderData.filter(order => order.orderStatus === 'created').length },
    { name: 'Paid', value: orderData.filter(order => order.orderStatus === 'paid').length },
    { name: 'Failed', value: orderData.filter(order => order.orderStatus === 'failed').length },
  ];

  const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

  // Event handler for bar clicks
  const handleBarClick = (data) => {
    if (data && data.value) {
      setClickedValue(data.value);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold font-serif mb-6">Home Delivery Order Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart for Paid vs. Unpaid Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Paid  vs. Unpaid Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paidUnpaidData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" onClick={(data) => handleBarClick(data)} />
            </BarChart>
          </ResponsiveContainer>
          {/* Display clicked value */}
          {clickedValue && <p className="text-center mt-4 text-xl">Clicked Value: {clickedValue}</p>}
        </div>

        {/* Pie Chart for Delivered vs. Not Delivered */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Delivered vs. Not Delivered Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deliveredData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {deliveredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Monthly Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Orders by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyOrderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Revenue by Month */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Revenue by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Top-Selling Categories */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Top-Selling Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Average Order Value */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Average Order Value by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={averageOrderValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgOrderValue" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default OrdersChartPage;
