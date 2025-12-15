import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import LogoHeader from "./LogoHeader";
import { getAllUserBookingsApi } from "../../server/allApi";
import SERVER_URL from "../../server/serverURL";
import CardShimmers from "../../shimmers/CardShimmers";

const Bookings = () => {
  const [bookings,setbookings]=useState([])
  const [isShimmer,setShimmer]=useState(true)


  const getAllBookings=async()=>{

    try {
      const res=await getAllUserBookingsApi()
    if(res.status==200){
      setbookings(res.data.data)
      setShimmer(false)

    }
    } catch (err) {
      console.log(err)
      
    }
  
  }

  const today=new Date()
  today.setHours(0,0,0,0)

  useEffect(()=>{
    getAllBookings()
  },[])
  
  if(isShimmer){
    return(
      <CardShimmers/>
    )
  }
  return (
    <div className="min-h-screen pt-20 pb-20 w-full bg-[#F7F7F7]">
  <UserHeader />
  <LogoHeader />

  <div className="m-6 md:m-10">

    {/* Title Card */}
    <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-100">
      <h1 className='text-3xl font-["figtree"] font-bold text-gray-900'>
        My Upcoming Bookings
      </h1>
    </div>

    {/* Booking Cards */}
    <div className="booking-cards my-10 flex flex-col gap-8">

      {bookings.length > 0 ? bookings.map((eachBooking, index) => (
        
        <div 
          key={index}
          className="bg-white rounded-3xl shadow-xl p-4 md:p-6 border border-gray-200
                     transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:flex gap-6"
        >

          {/* Image */}
          <div className="md:w-1/3 h-52 rounded-2xl overflow-hidden shadow-md">
            <img
              src={`${SERVER_URL}/uploads/${eachBooking.turfId?.turfImage}`}
              alt="Turf"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 flex flex-col justify-between">
            
            <div>

              <div className="flex justify-between items-center">
                <h1 className='text-2xl font-semibold text-gray-900'>
                  {eachBooking.turfId?.turfName}
                </h1>
                <p className="text-sm text-gray-500">
                  {eachBooking.bookingDate.split('T')[0]}
                </p>
              </div>

              <p className="text-gray-600 text-sm mt-1">
                {eachBooking.turfId?.location?.address}
              </p>

              <p className="text-green-700 mt-3 font-medium">
                Slot Type: <span className="font-semibold">{eachBooking.slot}</span>
              </p>

              <p className="text-blue-700 font-medium">
                Duration:{" "}
                <span className="font-semibold">
                  {new Date(eachBooking.startTime).toLocaleTimeString()} -{" "}
                  {new Date(eachBooking.endTime).toLocaleTimeString()}
                </span>
              </p>

              <p className="text-gray-900 text-lg mt-2">
                Price: <span className="font-bold text-green-700">${eachBooking.amount}</span>
              </p>

            </div>

            {/* Status Button */}
            <div className="mt-4">
              {new Date(eachBooking.bookingDate) >= today ? (
                <button className="w-full md:w-40 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl shadow-md transition">
                  Upcoming
                </button>
              ) : (
                <button className="w-full md:w-40 bg-gray-400 text-white py-2 rounded-xl shadow-md">
                  Completed
                </button>
              )}
            </div>

          </div>

        </div>

      )) : (
        <h1 className="text-red-500 text-center font-semibold text-xl">
          There are no bookings yet.
        </h1>
      )}

    </div>

  </div>
</div>

  );
};

export default Bookings;
