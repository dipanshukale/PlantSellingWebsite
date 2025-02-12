import React, { useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";

const CustomerDetailsPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });
    const location = useLocation();
    const navigate = useNavigate();
    const { total,cart } = location.state || {};
    
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to payment options page after form submission
    navigate("/paymentoptions", { state: { customer, total,cart } });
  };

  return (
    <div className="p-4 sm:p-8 mt-56 max-w-lg mx-auto shadow-black shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
                      name="name"
                      placeholder="Customer Name"
            value={customer.name}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-600 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
                      name="address"
                      placeholder="customer address"
            value={customer.address}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-600 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
                      name="phone"
                      placeholder="customer phone number"
            value={customer.phone}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-600 rounded-md"
          />
        </div>
              <button
          type="submit"
          className="bg-green-500 text-white mt-6 px-4 py-2 rounded-lg w-full"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default CustomerDetailsPage;
