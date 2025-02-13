import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RazorpayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customer, total, cart } = location.state || {}; // Include plants in state

  useEffect(() => {
    if (!customer || !total || !cart) {
      alert('Missing order details');
      navigate('/');
      return;
    }

    loadRazorpayScript();

  }, [customer, total, cart, navigate]);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Failed to load Razorpay SDK. Please check your internet connection.');
    };
    script.onload = () => {
      createOrderOnBackend(); // Create the order after Razorpay SDK is loaded
    };
    document.body.appendChild(script);
  };

  const createOrderOnBackend = async () => {
    try {
      const response = await axios.post('https://plantsellingwebsite-backend.onrender.com/create-order', {
        customer,
        cart,
        total,
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      const { orderId } = response.data; // Get the order ID from backend
      handleRazorpayPayment(orderId); // Proceed to payment
    } catch (error) {
      console.error('Error creating order on backend', error);
      alert('Failed to create order. Please try again later.');
    }
  };

  const handleRazorpayPayment = (orderId) => {
    if (!window.Razorpay) {
      alert('Razorpay SDK not available.');
      return;
    }

    const options = {
      key: 'rzp_live_49vEWKmzHvplqT',
      amount: total * 100, // Amount in paise
      currency: 'INR',
      name: customer.name,
      description: 'Plant Order Payment',
      order_id: orderId, // Use the order ID from backend
      handler: async (response) => {
        try {
          await axios.post('https://plantsellingwebsite-backend.onrender.com/payment-success', {
            orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json'},
          });
          // Redirect to confirmation page on success
          navigate('/order-confirmation', { state: { customer, paymentMode: 'Online', orderId } });
        } catch (error) {
          console.error('Error updating payment on backend', error);
          alert('Payment successful, but failed to update the backend.');
        }
      },
      prefill: {
        name: customer.name,
        email: customer.email || '',
        contact: customer.phone || '',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      alert(`Payment Failed. Reason: ${response.error.description}`);
    });

    rzp.open();
  };

  if (!customer || !total || !cart) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-8 mt-20 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Proceeding to Payment...</h2>
      <p>Name: {customer.name}</p>
      <p>Total: ₹{total}</p>
      <button
        className="bg-blue-500 text-white mt-6 px-4 py-2 rounded-lg w-full"
        onClick={createOrderOnBackend} // Trigger order creation and payment
      >
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayPage;
