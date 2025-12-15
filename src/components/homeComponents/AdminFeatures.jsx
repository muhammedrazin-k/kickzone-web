import React from 'react'
import { Link } from 'react-router-dom'

const AdminFeatures = () => {
  return (
    <div className="m-6 md:m-10 font-['figtree']">

    {/* Header Section */}
    <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl p-8 shadow-lg mb-8 text-white">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-sm opacity-90 mt-2">
        Manage users, owners, turfs, and bookings across the platform.
      </p>
    </div>
  
    {/* Grid Cards */}
    <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  
        {/* Users */}
        <Link
          to={"/admin/allusers"}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-7 shadow-sm 
                     hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-900">Manage Users</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            View, verify, and manage all registered users on the platform.
          </p>
        </Link>
  
        {/* Owners */}
        <Link
          to={"/admin/allowners"}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-7 shadow-sm 
                     hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-900">Manage Owners</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Review venue owners, handle approvals, and track their activities.
          </p>
        </Link>
  
        {/* Turfs */}
        <Link
          to={"/admin/allturfs"}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-7 shadow-sm 
                     hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-900">Manage Turfs</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Approve new turf listings, manage updates, and monitor performance.
          </p>
        </Link>
  
        {/* Bookings */}
        <Link
          to={"/admin/allbookings"}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-7 shadow-sm 
                     hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-900">All Bookings</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Track every booking made across users, owners, and turfs.
          </p>
        </Link>
  
      </div>
    </div>
  
  </div>
  )
}

export default AdminFeatures