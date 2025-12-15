import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOwnerDetailsApi } from '../../server/allApi'
import SERVER_URL from '../../server/serverURL'

const OwnerView = () => {
    const {ownerId}=useParams()
    const [onwerDetails,setOwnerDetails]=useState([])

    const getOwnerdetails=async()=>{
        try {
            const res=await getOwnerDetailsApi(ownerId)
            setOwnerDetails(res.data?.data)
            
        } catch (err) {
            console.log(err)
            
        }
    }

    useEffect(()=>{
        getOwnerdetails()
    },[])
    
  return (
    <div className="bg-gray-100 min-h-screen flex">

  <div className="w-full p-6 overflow-y-auto">

    {/* ===================== HEADER ===================== */}
    <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-8 rounded-3xl shadow-lg mb-8">
      <h1 className="text-3xl font-semibold text-white">
        Owner Profile
      </h1>
      <p className="text-emerald-100 mt-1 font-['figtree']">
        View detailed information about the turf owner
      </p>
    </div>

    {/* ===================== PROFILE CARD ===================== */}
    <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">

        {/* Profile Image */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-300 blur-xl opacity-30"></div>
          <img
            src={`${SERVER_URL}/uploads/${onwerDetails.profileImg}`}
            className="relative w-32 h-32 rounded-full border-4 border-emerald-500 shadow object-cover object-top bg-white"
            alt="Owner"
          />
        </div>

        {/* Basic Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">
            {onwerDetails?.name}
          </h2>
          <p className="text-gray-600 text-lg mt-1">
            {onwerDetails?.emailId}
          </p>

          <div className="mt-3 inline-flex items-center gap-2">
            <span className="text-gray-600">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                onwerDetails.isBlocked
                  ? "bg-red-100 text-red-600"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {onwerDetails.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
        </div>

        {/* Action */}
        <div>
          <Link to="/admin/allowners">
            <button className="px-6 py-2 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition">
              Back
            </button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10" />

      {/* ===================== DETAILS GRID ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-semibold text-gray-800">
            {onwerDetails.name}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-semibold text-gray-800">
            {onwerDetails.emailId}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-lg font-semibold text-gray-800">
            {onwerDetails.phone}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500">Joined On</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date(onwerDetails.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      {/* ===================== NOTES ===================== */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">
          Additional Notes
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Trusted shop owner with verified documents. No violations reported.
        </p>
      </div>

    </div>
  </div>
</div>

  )
}

export default OwnerView