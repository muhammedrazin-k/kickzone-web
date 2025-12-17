import React from "react";
import { Link } from "react-router-dom";

const Feature = ({ userRole }) => {
  let linkText = "/login";
  if (userRole === "user") {
    linkText = "/user/dashboard";
  }
  return (
    <div className="m-6 md:m-10 bg-white rounded-3xl py-10" id="features">

  {/* ================= BOOK VENUES ================= */}
  <div>
    <div className="flex justify-between px-4 md:px-10">
      <h2 className='text-lg md:text-2xl font-bold font-["figtree"] text-gray-700'>
        Book Venues
      </h2>
      <Link to={linkText} className="my-auto">
        <h2 className="font-[figtree] font-semibold text-emerald-600 text-[12px] md:text-lg">
          SEE ALL VENUES
        </h2>
      </Link>
    </div>

    <div className="carousel rounded-box ms-3 md:ms-10 flex py-4 md:py-5">

      {[1,2,3,4,5,6].map((_, i) => (
        <div
          key={i}
          className="carousel-item w-72 sm:w-80 h-52
                     border border-emerald-200 rounded-xl
                     shadow-sm p-4 mx-2 bg-white flex flex-col justify-between"
        >
          {/* Header badge */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              TURF
            </span>
            <span className="text-sm font-semibold text-emerald-700">
              ★ 4.7
            </span>
          </div>

          {/* Main content */}
          <div>
            <p className='text-lg font-semibold font-["figtree"] text-gray-800 leading-tight'>
              liones arena calicut india
            </p>
            <p className='text-gray-500 font-["figtree"] text-sm mt-1'>
              29RR+QMR, Pazhanganadi, kannur
            </p>
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-emerald-100">
            <p className="text-xs text-gray-500 font-['figtree']">
              Available today • Indoor / Outdoor
            </p>
          </div>
        </div>
      ))}

    </div>
  </div>

  {/* ================= ACTIVITIES ================= */}
  <div className="mt-14">
    <div className="flex justify-between px-4 md:px-10">
      <h2 className='text-lg md:text-2xl font-bold font-["figtree"] text-gray-700'>
        Activities
      </h2>
      <Link to={linkText} className="my-auto">
        <h2 className="font-[figtree] font-semibold text-emerald-600 text-[12px] md:text-lg">
          SEE ALL ACTIVITIES
        </h2>
      </Link>
    </div>

    <div className="carousel rounded-box ms-3 md:ms-10 flex py-4 md:py-5">

      {[1,2,3].map((_, i) => (
        <div
          key={i}
          className="carousel-item w-72 sm:w-80 h-56
                     border border-emerald-200 rounded-xl
                     shadow-sm p-4 mx-2 bg-white flex flex-col justify-between"
        >
          {/* Top meta */}
          <div className="flex justify-between">
            <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Under 15
            </span>
            <span className="text-xs text-gray-400 font-['figtree']">
              Group Training
            </span>
          </div>

          {/* Title */}
          <div>
            <p className='text-lg font-semibold font-["figtree"] text-gray-800'>
              Football Coaching
            </p>
            <p className='text-sm text-gray-500 font-["figtree"] mt-1'>
              Anzeer | former SN club player
            </p>
          </div>

          {/* Time */}
          <div>
            <p className='text-gray-800 font-semibold text-sm font-["figtree"]'>
              Sat, 13 Sep 2025
            </p>
            <p className='text-gray-600 text-sm font-["figtree"]'>
              07:00 PM – 09:00 PM
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-center">
            <span className='bg-emerald-50 text-[10px] px-6 py-1
                             font-["figtree"] rounded-full
                             border border-emerald-200 text-emerald-700'>
              Beginner – Professional
            </span>
          </div>
        </div>
      ))}

    </div>
  </div>

</div>

  );
};

export default Feature;
