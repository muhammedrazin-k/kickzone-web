import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="m-6 md:m-10 bg-white rounded-3xl shadow-lg p-10 border border-gray-100">
    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
  
      {/* ---------- TEXT CONTENT ---------- */}
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['figtree'] text-gray-900 leading-snug">
          Meet the Creator
        </h1>
  
        <p className="text-gray-500 text-sm sm:text-lg max-w-xl mt-4 mb-6 font-['figtree'] leading-relaxed">
          Clarity gives you the blocks & components you need to create a
          truly professional website, landing page or admin panel for your SaaS.
        </p>
  
        <Link to={"/creator"}>
          <button className="px-7 py-3 rounded-xl text-white font-semibold
                             bg-gradient-to-r from-green-600 to-emerald-500
                             shadow-md hover:shadow-lg hover:scale-[1.03]
                             transition-all duration-300">
            READ MY STORY
          </button>
        </Link>
      </div>
  
      {/* ---------- IMAGE SECTION ---------- */}
      <div className="w-full md:w-1/3 flex justify-center">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-50 p-3">
          <img
            src="/animated-image.png"
            alt="Creator"
            className="w-52 h-52 object-contain mx-auto transform transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
  
    </div>
  </div>
  );
};

export default About;
