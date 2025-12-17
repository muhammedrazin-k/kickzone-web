import React from "react";
import { Link } from "react-router-dom";

const Feature = ({ userRole }) => {
  let linkText = "/login";
  if (userRole === "user") {
    linkText = "/user/dashboard";
  }
  return (
    <div className="m-6 md:m-10 bg-white rounded-3xl py-10" id="features">
      <div>
        <div className="text flex justify-between px-4 md:px-10 ">
          <h2 className='text-lg md:text-2xl font-bold font-["figtree"] text-gray-700'>
            Book Venues
          </h2>
          <Link to={linkText} className="my-auto">
            <h2 className="font-[figtree] font-semibold text-green-700 text-[12px]  md:text-lg ">
              SEE ALL VENUES{" "}
            </h2>
          </Link>
        </div>

        <div className="carousel rounded-box  ms-3 md:ms-10 flex   py-4 md:py-5">
          <div className="carousel-item w-72 sm:w-80 h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <div className="card-image w-full  h-2/3">
              <img
                src="/turf-image1.avif"
                className="h-full w-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="flex justify-between my-3">
              <p className='text-lg font-semibold font-["figtree"]'>
                liones arena calicut india
              </p>
              <p className="bg-green-300 px-4 rounded-lg text-md text-green-800">
                4.7
              </p>
            </div>
            <p className='text-gray-500 font-["figtree"]'>
              29RR+QMR, Pazhanganadi, kannur
            </p>
          </div>

          <div className="carousel-item w-72 sm:w-80  h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <div className="card-image w-full  h-2/3">
              <img
                src="/turf-image2.webp"
                className="h-full w-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="flex justify-between my-3">
              <p className='text-lg font-semibold font-["figtree"]'>
                liones arena calicut india
              </p>
              <p className="bg-green-300 px-4 rounded-lg text-md text-green-800">
                4.7
              </p>
            </div>
            <p className='text-gray-500 font-["figtree"]'>
              29RR+QMR, Pazhanganadi, kannur
            </p>
          </div>
          <div className="carousel-item w-72 sm:w-80  h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <div className="card-image w-full  h-2/3">
              <img
                src="/turf-image-3.webp"
                className="h-full w-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="flex justify-between my-3">
              <p className='text-lg font-semibold font-["figtree"]'>
                liones arena calicut india
              </p>
              <p className="bg-green-300 px-4 rounded-lg text-md text-green-800">
                4.7
              </p>
            </div>
            <p className='text-gray-500 font-["figtree"]'>
              29RR+QMR, Pazhanganadi, kannur
            </p>
          </div>
          <div className="carousel-item w-72 sm:w-80  h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <div className="card-image w-full  h-2/3">
              <img
                src="/turf-image4.webp"
                className="h-full w-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="flex justify-between my-3">
              <p className='text-lg font-semibold font-["figtree"]'>
                liones arena calicut india
              </p>
              <p className="bg-green-300 px-4 rounded-lg text-md text-green-800">
                4.7
              </p>
            </div>
            <p className='text-gray-500 font-["figtree"]'>
              29RR+QMR, Pazhanganadi, kannur
            </p>
          </div>
          <div className="carousel-item w-72 sm:w-80  h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <div className="card-image w-full  h-2/3">
              <img
                src="/turf-image.avif"
                className="h-full w-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="flex justify-between my-3">
              <p className='text-lg font-semibold font-["figtree"]'>
                liones arena calicut india
              </p>
              <p className="bg-green-300 px-4 rounded-lg text-md text-green-800">
                4.7
              </p>
            </div>
            <p className='text-gray-500 font-["figtree"]'>
              29RR+QMR, Pazhanganadi, kannur
            </p>
          </div>
          <div className="carousel-item w-72 sm:w-80  h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <div className="card-image w-full  h-2/3">
              <img
                src="/turf-image2.webp"
                className="h-full w-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="flex justify-between my-3">
              <p className='text-lg font-semibold font-["figtree"]'>
                liones arena calicut india
              </p>
              <p className="bg-green-300 px-4 rounded-lg text-md text-green-800">
                4.7
              </p>
            </div>
            <p className='text-gray-500 font-["figtree"]'>
              29RR+QMR, Pazhanganadi, kannur
            </p>
          </div>
        </div>
      </div>
      <div className="my-15">
        <div className="text flex justify-between px-4 md:px-10 ">
          <h2 className='text-lg md:text-2xl font-bold font-["figtree"] text-gray-700'>
            Activities
          </h2>
          <Link to={linkText} className="my-auto">
            <h2 className="font-[figtree] font-semibold text-green-700 text-[12px]  md:text-lg ">
              SEE ALL ACTIVITIES{" "}
            </h2>
          </Link>
        </div>

        <div className="carousel rounded-box  ms-3 md:ms-10 flex   py-4 md:py-5">
          <div className="carousel-item w-72 sm:w-80 h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <p className='p-1 text-gray-400 font-["figtree"] text-sm'>
              Under 15
            </p>
            <div className="card-image flex gap-4">
              <img
                src="/turf-image1.avif"
                className="h-14 w-14  object-cover rounded-full"
                alt=""
              />
              <p className='text-lg font-semibold font-["figtree"] max-w-40 my-auto'>
                Football Coaching{" "}
              </p>
            </div>
            <div className=" my-3">
              <p className='text-sm text-gray-500  font-["figtree"]'>
                Anzeer | former Sn club player
              </p>
            </div>
            <p className='text-gray-800 font-semibold text-sm font-["figtree"]'>
              Sat, 13 Sep 2025, 07:00 PM - 09:00 PM
            </p>
            <p className='text-gray-600 font-["figtree"] my-1 text-sm'>
              Lions Arena - Olympi... ~6.09 Kms
            </p>

            <div className="flex justify-center">
              <p className='bg-gray-100 text-[10px] p-1 font-["figtree"] rounded-lg px-8 border-1 border-gray-300'>
                Beginer-Proffesional
              </p>
            </div>
          </div>

          <div className="carousel-item w-72 sm:w-80 h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <p className='p-1 text-gray-400 font-["figtree"] text-sm'>
              Above 18
            </p>
            <div className="card-image flex gap-4">
              <img
                src="/football-image.jpg"
                className="h-14 w-14  object-cover rounded-full"
                alt=""
              />
              <p className='text-lg font-semibold font-["figtree"] max-w-40 my-auto'>
                Cardio section
              </p>
            </div>
            <div className=" my-3">
              <p className='text-sm text-gray-500  font-["figtree"]'>
                jishnu | big town trainer
              </p>
            </div>
            <p className='text-gray-800 font-semibold text-sm font-["figtree"]'>
              Sat, 13 Sep 2025, 09:00 PM - 10:00 PM
            </p>
            <p className='text-gray-600 font-["figtree"] my-1 text-sm'>
              Carribeans-Arena - Olympi... ~6.09 Kms
            </p>

            <div className="flex justify-center">
              <p className='bg-gray-100 text-[10px] p-1 font-["figtree"] rounded-lg px-8 border-1 border-gray-300'>
                Ameteur-Proffesional
              </p>
            </div>
          </div>

          <div className="carousel-item w-72 sm:w-80 h-60 border-1 border-gray-300 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.3)] p-2 flex-col mx-2">
            <p className='p-1 text-gray-400 font-["figtree"] text-sm'>
              Above 15
            </p>
            <div className="card-image flex gap-4">
              <img
                src="/football-image.jpg"
                className="h-14 w-14  object-cover rounded-full"
                alt=""
              />
              <p className='text-lg font-semibold font-["figtree"] max-w-40 my-auto'>
                Football training
              </p>
            </div>
            <div className=" my-3">
              <p className='text-sm text-gray-500  font-["figtree"]'>
                Savad | former Seethi Coach
              </p>
            </div>
            <p className='text-gray-800 font-semibold text-sm font-["figtree"]'>
              Sat, 18 Nov 2025, 07:00 PM - 09:00 PM
            </p>
            <p className='text-gray-600 font-["figtree"] my-1 text-sm'>
              Lions Arena - Olympi... ~6.09 Kms
            </p>

            <div className="flex justify-center">
              <p className='bg-gray-100 text-[10px] p-1 font-["figtree"] rounded-lg px-8 border-1 border-gray-300'>
                Beginer-Proffesional
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
