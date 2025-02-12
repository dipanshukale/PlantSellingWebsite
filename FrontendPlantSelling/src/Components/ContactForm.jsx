import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let messageTimeout = null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true before the request

    try {
      const response = await axios.post(
        "https://plantsellingwebsite-backend.onrender.com/contact",
        {
          email,
          message,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setStatusMessage(response.data.message);
      setError(false);
      setEmail("");
      setMessage("");
     
      messageTimeout = setTimeout(() => {
        setStatusMessage("");
      }, 3000);
    } catch (error) {
      setError(true);
      setStatusMessage(error.response?.data?.error || "Something went wrong");

      
      messageTimeout = setTimeout(() => {
        setStatusMessage("");
      }, 3000);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Clear timeout when component unmounts to avoid memory leaks
  useEffect(() => {
    return () => {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
    };
  }, [messageTimeout]);

  return (
    <div className="w-full px-4 lg:px-16 py-10">
      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-center">
        <div className="flex flex-col items-center">
          <img
            src="/Shipping.jpeg"
            alt="Free Shipping"
            className="h-14 rounded-full"
          />
          <p className="mt-2 text-lg font-semibold">Free Shipping</p>
          <p className="text-sm text-gray-600">On all orders above ₹500</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/support.jpeg" alt="24/7 Support" className="h-14 rounded-full" />
          <p className="mt-2 text-lg font-semibold">24/7 Customer Support</p>
          <p className="text-sm text-gray-600">We are here to help you anytime</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/payment.jpeg" alt="Secure Payment" className="h-14 rounded-full" />
          <p className="mt-2 text-lg font-semibold">Secure Payment</p>
          <p className="text-sm text-gray-600">100% secure payment options</p>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-16 max-w-4xl mx-auto text-left p-6 lg:p-0">
        <h2 className="text-3xl font-sans font-bold text-gray-800">About</h2>
        <p className="text-gray-600 mt-4">
          We are dedicated to bringing the best selection of plants and gardening
          accessories to your doorstep. Our mission is to make plant shopping simple
          and enjoyable for everyone.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="mt-16 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-sans font-bold text-gray-800 text-left">
          Contact Us
        </h2>
        <p className="text-left text-xl text-gray-600 mt-2">
          Have any questions? Feel free to reach out to us.
        </p>

        <form className="mt-6 text-left" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter Your Mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              placeholder="Type your message here..."
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full border-2 border-black hover:bg-[#0f352e] hover:text-white text-black py-2 rounded-lg transition"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending..." : "Send Message"} {/* Loader text */}
          </button>
        </form>

        {/* Status message */}
        {statusMessage && (
          <p className={`mt-4 text-center ${error ? "text-red-600" : "text-green-600"}`}>
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
