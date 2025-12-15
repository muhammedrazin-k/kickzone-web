import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { getAllBookingsApi } from '../../server/allApi';
import SERVER_URL from '../../server/serverURL';

const AdminBookings = () => {
    const [allbookings , setAllBookings]=useState([])
    const getAllBookings=async()=>{
      try {
        const res=await getAllBookingsApi()
        setAllBookings(res.data.data)
      } catch (err) {
        console.log(err.message)        
      }
    }

    useEffect(()=>{
      getAllBookings()
    },[])
  return (
    <div className="bg-gray-100 min-h-screen w-full md:flex">
    <AdminHeader />
  
    <div className="w-full p-6 overflow-y-auto h-screen pt-20 md:pt-10">
  
      {/* ===================== PAGE HEADER ===================== */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-8 rounded-3xl shadow-lg mb-8">
        <h1 className="text-3xl font-semibold text-white">All Bookings</h1>
        <p className="text-emerald-100 mt-1 font-['figtree']">
          Monitor and track all turf bookings across the platform
        </p>
      </div>
  
      {/* ===================== BOOKINGS GRID ===================== */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  
        {allbookings.length > 0 ? (
          allbookings.map((booking, index) => (
  
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition"
            >
  
              {/* Turf Image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={`${SERVER_URL}/uploads/${booking.turfId?.turfImage}`}
                  alt="Turf"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
  
              {/* Content */}
              <div className="p-6 space-y-2">
  
                <h2 className="text-lg text-gray-800">
                  <span className="font-semibold text-emerald-700">
                    {booking.userId.name}
                  </span>{" "}
                  booked a turf
                </h2>
  
                <p className="text-sm text-gray-600">
                  🏟 <span className="font-medium">{booking.turfId?.turfName}</span>
                </p>
  
                <p className="text-sm text-gray-600">
                  🎯 Slot Type: <span className="font-medium">{booking.slot}</span>
                </p>
  
                <p className="text-sm text-gray-600">
                  📅 {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
  
                <p className="text-sm text-gray-600">
                  ⏰{" "}
                  {new Date(booking.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  -{" "}
                  {new Date(booking.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
  
                <p className="text-sm text-gray-700">
                  💰 Amount:{" "}
                  <span className="font-semibold text-gray-900">
                    ₹{booking.amount}
                  </span>
                </p>
  
                {/* Status */}
                <div className="pt-3">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                    Confirmed
                  </span>
                </div>
  
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-red-600 font-medium text-lg">
              There are no bookings yet
            </p>
          </div>
        )}
  
      </div>
    </div>
  </div>
  
  )
}

export default AdminBookings