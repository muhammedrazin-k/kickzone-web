import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOwnerDetailsApi } from '../../server/allApi'
import SERVER_URL from '../../server/serverURL'


const UserView = () => {
    const {userId}=useParams()
    const [userDetails,setUserDetails]=useState([])
    const getOwnerdetails=async()=>{
        try {
            const res=await getOwnerDetailsApi(userId)
            setUserDetails(res.data?.data)
            
        } catch (err) {
            console.log(err)
            
        }
    }


    useEffect(()=>{
        getOwnerdetails()
    },[])


  return (
    <div className="bg-gray-100 min-h-screen md:flex">

    <div className="w-full p-6 overflow-y-auto">
  
      {/* ===================== HEADER ===================== */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-8 rounded-3xl shadow-lg mb-8">
        <h1 className="text-3xl font-semibold text-white">
          User Profile
        </h1>
        <p className="text-emerald-100 mt-1 font-['figtree']">
          View detailed user information
        </p>
      </div>
  
      {/* ===================== PROFILE CARD ===================== */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">
  
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-8">
  
          {/* Profile Image */}
          <div className="relative">
            <img
              src={`${SERVER_URL}/uploads/${userDetails.profileImg}`}
              alt="User"
              className="w-36 h-36 rounded-full object-cover object-top border-4 border-emerald-500 shadow-lg"
            />
          </div>
  
          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              {userDetails?.name}
            </h2>
  
            <p className="text-gray-600 text-lg mt-1">
              {userDetails?.emailId}
            </p>
  
            <div className="mt-3">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  userDetails.isBlocked
                    ? "bg-red-100 text-red-600"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {userDetails.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>
          </div>
  
          {/* Action */}
          <div>
            <Link to="/admin/allusers">
              <button className="px-6 py-2 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition">
                Back
              </button>
            </Link>
          </div>
        </div>
  
        {/* DIVIDER */}
        <div className="my-8 h-px bg-gray-200"></div>
  
        {/* ===================== DETAILS GRID ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-sm text-gray-500 mb-1">Full Name</h3>
            <p className="text-lg font-medium text-gray-800">
              {userDetails.name}
            </p>
          </div>
  
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-sm text-gray-500 mb-1">Email</h3>
            <p className="text-lg font-medium text-gray-800">
              {userDetails.emailId}
            </p>
          </div>
  
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-sm text-gray-500 mb-1">Phone</h3>
            <p className="text-lg font-medium text-gray-800">
              {userDetails.phone}
            </p>
          </div>
  
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-sm text-gray-500 mb-1">Joined On</h3>
            <p className="text-lg font-medium text-gray-800">
              {new Date(userDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
  
        </div>
  
        {/* ===================== NOTES ===================== */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">
            Additional Notes
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Trusted shop owner with verified documents. No violations reported.
          </p>
        </div>
  
      </div>
    </div>
  </div>
  
  )
}

export default UserView