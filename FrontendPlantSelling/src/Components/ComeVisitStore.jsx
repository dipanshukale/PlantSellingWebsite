import React from "react";

const ComeVisitStore = () => {
  return (
    <div className="flex justify-center px-4 lg:px-16 py-10">
      <div className="relative w-full max-w-6xl h-96 bg-cover bg-center rounded-lg overflow-hidden shadow-lg" 
        style={{ backgroundImage: "url('/store.jpeg')" }}>


        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="absolute bottom-6 lg:left-6 md:left-10 bg-[#d4e3d3] p-5 rounded-lg shadow-md max-w-md text-gray-800">
          <h1 className="text-2xl md:text-3xl font-serif font-bold">Come Visit Our Store</h1>
          <p className="mt-2 text-sm md:text-base">
            Experience our exclusive collection in person. Find the perfect plant for your home and get expert advice from our team.
          </p>
          <p className="mt-2 font-semibold text-sm md:text-base">📍 Location: Bajaj Nagar Nagpur, City</p>
          <p className="mt-1 font-semibold text-sm md:text-base">🕒 Open: 10:00 AM - 8:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ComeVisitStore;
