import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const OnlineOrdersAnalysis = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("https://plantsellingwebsite-backend.onrender.com/online-orders");
        setOrderData(response.data.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  // Prepare data for charts
  const paidUnpaidData = [
    { name: 'Paid', value: orderData.filter(order => order.orderStatus === 'paid').length },
    { name: 'Unpaid', value: orderData.filter(order => order.orderStatus === 'created').length },
  ];

  const deliveredData = [
    { name: 'Delivered', value: orderData.filter(order => order.orderStatus === 'paid').length },
    { name: 'Not Delivered', value: orderData.filter(order => order.orderStatus === 'created').length },
  ];

  // Monthly orders and revenue data
  const monthlyOrderData = orderData.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
    const found = acc.find(item => item.month === month);
    if (found) {
      found.orders += 1;
      found.revenue += order.totalAmount;
    } else {
      acc.push({ month, orders: 1, revenue: order.totalAmount });
    }
    return acc;
  }, []);

  // Top-selling categories data
  const categoryData = orderData.reduce((acc, order) => {
    order.cart.forEach(item => {
      const found = acc.find(cat => cat.name === item.category);
      if (found) {
        found.orders += item.quantity;
      } else {
        acc.push({ name: item.category, orders: item.quantity });
      }
    });
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold font-serif mb-6">Online Order Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart for Paid vs. Unpaid Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Paid vs. Unpaid Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paidUnpaidData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
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

        {/* Area Chart for Monthly Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyOrderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart for Paid vs. Unpaid and Delivered vs. Not Delivered */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Radar Chart - Order Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={paidUnpaidData.concat(deliveredData)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar name="Order Status" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
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

      </div>
    </div>
  );
};

export default OnlineOrdersAnalysis;
