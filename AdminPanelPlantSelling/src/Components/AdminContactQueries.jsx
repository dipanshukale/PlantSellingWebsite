import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminContactQueries = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetching queries from the backend API
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/contact-queries");
        setQueries(response.data.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };
    fetchQueries();
  }, []);

  // Open modal and set selected query
  const handleSendEmail = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedQuery(null);
    setIsModalOpen(false);
    setEmailMessage("");
  };

  // Handle sending email
  const handleEmailSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/send-email", {
        email: selectedQuery.email,
        message: emailMessage,
      });
      closeModal(); // Close modal after sending email
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a query
  const handleDeleteQuery = async (queryId) => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/contact-queries/${queryId}`);
      setQueries(queries.filter((query) => query._id !== queryId)); // Remove the query from state
    } catch (error) {
      console.error("Error deleting query:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold font-serif text-center mb-6">Customer Queries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {queries.length > 0 ? (
          queries.map((query) => (
            <div
              key={query._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">Customer: {query.name}</h2>
                <p className="mb-2">
                  <strong>Email:</strong> {query.email}
                </p>
                <p className="mb-4">
                  <strong>Message:</strong> {query.message}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Submitted on:</strong> {new Date(query.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Reply and Delete buttons positioned at the bottom */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="text-white bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                  onClick={() => handleSendEmail(query)} // Open modal when clicked
                  disabled={isDeleting} // Disable during delete
                >
                  Reply
                </button>
                <button
                  className={`text-white bg-red-500 rounded-lg px-4 py-2 hover:bg-red-600 transition-colors duration-300 cursor-pointer ${isDeleting ? 'cursor-not-allowed' : ''}`}
                  onClick={() => handleDeleteQuery(query._id)} // Delete query
                  disabled={isDeleting} // Disable during delete
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No queries found</p>
        )}
      </div>

      {/* Modal for sending email */}
      {isModalOpen && selectedQuery && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-12 rounded-lg shadow-3xl max-w-md w-full">
            <h2 className="text-xl font-medium mb-4">Send Email to {selectedQuery.email}</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter your response here...."
              rows={5}
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={closeModal}
                disabled={isLoading} // Disable button when loading
              >
                Cancel
              </button>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'cursor-not-allowed' : ''}`}
                onClick={handleEmailSubmit}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Sending..." : "Send Email"} {/* Show loader or text */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactQueries;
