import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-10 lg:mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Title on Left */}
        <h1 className="text-4xl font-thin text-gray-800 w-full md:w-1/3">
          ABOUT US
        </h1>

        {/* Content on Right */}
        <p className="text-gray-600 text-lg w-96 md:w-2/3 p-6 lg:p-0">
          Welcome to <strong className="text-[#0f352e]">Secret Garden</strong>, your one-stop destination
          for beautiful plants and garden essentials. We believe in bringing
          nature closer to you with a wide range of home décor plants, vibrant
          flowers, and stylish pots. Let’s make your space greener together!
        </p>
      </div>

      {/* Image Slider Section */}
      <div className="mt-12 p-6">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          modules={[Pagination, Autoplay]}
          className="w-full"
        >
          {/* Image Slides */}
          {[
            "Hero1.jpeg",
            "/Hero2.jpg",
            "/Hero3.jpg",
            "/about.jpg",
          ].map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Plant ${index + 1}`}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AboutUs;
