import React from "react";

const plants = [
  "Snake Plant",
  "Aloe Vera",
  "Peace Lily",
  "Spider Plant",
  "Pothos",
  "Fiddle Leaf Fig",
  "Bamboo Palm",
];

const ScrollingBanner = () => {
  return (
    <div className="w-full bg-[#f1eeda] h-20 overflow-hidden relative flex items-center">
      <div className="absolute flex animate-scroll whitespace-nowrap">
        {[...plants, ...plants].map((plant, index) => (
          <span
            key={index}
            className="text-[#292929] font-sans font-bold text-2xl lg:text-2xl md:text-3xl px-4"
          >
            ---  &nbsp; &nbsp; &nbsp;  {plant}
          </span>
        ))}
      </div>

      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ScrollingBanner;
