import React, { useEffect, useState } from "react";
import OwnerDrawer from "./OwnerDrawer";
import { allBookingsApi } from "../../server/allApi";

const AllBookings = () => {
  const [allhistory, setallHistory] = useState([]);
  const AllBookings = async () => {
    try {
      const res = await allBookingsApi();
      if (res.status == 200) {
        setallHistory(res.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const today=new Date()
  today.setHours(0,0,0,0)

  useEffect(() => {
    AllBookings();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen w-full md:flex">
    <OwnerDrawer />
  
    {/* Main Content */}
    <div className="flex-1 overflow-y-auto p-6 md:p-10 font-['figtree']">
  
      {/* Header Card */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-6 rounded-3xl shadow-lg mb-10 text-white">
        <h1 className="text-2xl font-semibold">All Bookings</h1>
        <p className="text-sm text-gray-200 mt-1">
          View all booking history across your turfs
        </p>
      </div>
  
      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 overflow-x-auto">
  
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 text-sm uppercase tracking-wide">
              <th className="py-3 px-4 rounded-l-xl">#</th>
              <th className="py-3 px-4">Turf</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Slot Type</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-r-xl">Payment</th>
            </tr>
          </thead>
  
          <tbody className="text-sm">
            {allhistory.length > 0 ? (
              allhistory.map((history, index) => {
                const isUpcoming = new Date(history.bookingDate) >= today;
  
                return (
                  <tr
                    key={history._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-700">{index + 1}</td>
  
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {history?.turfDetails?.turfName}
                    </td>
  
                    <td className="py-3 px-4 text-gray-600">
                      {history.bookingDate.split("T")[0]}
                    </td>
  
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(history.startTime).toLocaleTimeString()} -{" "}
                      {new Date(history.endTime).toLocaleTimeString()}
                    </td>
  
                    <td className="py-3 px-4 text-gray-700">{history.slot}</td>
  
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {history?.userDetails?.name}
                    </td>
  
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      ₹{history.amount}
                    </td>
  
                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      {isUpcoming ? (
                        <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          Upcoming
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full">
                          Completed
                        </span>
                      )}
                    </td>
  
                    {/* Payment Badge */}
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                        Paid
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-10 text-red-500 font-medium">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default AllBookings;
