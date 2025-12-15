import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { approveTurfApi, getAdminallturfsApi, rejectTurfApi } from '../../server/allApi'
import { toast } from 'react-toastify'

const AdminAllTurfs = () => {

  const [turfs,setTurfs]=useState([])


  const getAllTurfs=async()=>{
    try {
      const res=await getAdminallturfsApi()
      if(res.status==200){
        setTurfs(res.data?.data)
      }
    } catch (err) {
      console.log(err)
      
    }
  }

  const handleApprove=async(id,reqBody)=>{
    try { 

      const res=await approveTurfApi(id,{status:reqBody})

      if(res.status===201){
       return toast.warning(res.data?.message)
      }
      
      if(res.data?.data=="approved"){
        toast.success(res.data?.message)
        getAllTurfs()
      }
      
      if(res.data?.data=="rejected"){
        toast.error(res.data?.message)
        getAllTurfs()
      }

      
    } catch (err) {
      console.log(err.message)
      
    }

  }



  useEffect(()=>{
    getAllTurfs()
  },[])

  return (
    <div className="bg-gray-100 min-h-screen w-full md:flex">

    <AdminHeader />
  
    <div className="w-full pt-20 md:pt-5 overflow-y-auto h-screen">
  
      {/* ===================== PAGE HEADER ===================== */}
      <div className="mx-6 mt-6">
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl font-semibold text-white">
            All Turfs
          </h1>
          <p className="text-emerald-100 mt-1 font-['figtree']">
            Review, approve or reject turf listings
          </p>
        </div>
      </div>
  
      {/* ===================== TURFS TABLE ===================== */}
      <div className="m-6 bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">
  
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Turf Listings
          </h2>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Turf Name</th>
                <th className="px-6 py-4 text-left">Owner</th>
                <th className="px-6 py-4 text-left">Slots</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
  
            <tbody className="divide-y divide-gray-200">
  
              {turfs.length > 0 ? (
                turfs.map((turf, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-700">
                      {index + 1}
                    </td>
  
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {turf.turfName}
                    </td>
  
                    <td className="px-6 py-4 text-gray-600">
                      {turf.ownerId.name}
                    </td>
  
                    {/* Slots */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {turf.slots.map((slot, i) => (
                          <div
                            key={i}
                            className="text-xs px-3 py-1 bg-gray-100 rounded-full inline-block mr-1"
                          >
                            {slot.type} – ₹{slot.price}
                          </div>
                        ))}
                      </div>
                    </td>
  
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          turf.turfStatus === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : turf.turfStatus === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {turf.turfStatus}
                      </span>
                    </td>
  
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {/* <button className="px-4 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                          View
                        </button> */}
  
                        <button
                          onClick={() =>
                            handleApprove(turf._id, "approved")
                          }
                          className="px-4 py-1.5 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
                        >
                          Approve
                        </button>
  
                        <button
                          onClick={() =>
                            handleApprove(turf._id, "rejected")
                          }
                          className="px-4 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-red-600 font-medium"
                  >
                    There are no turfs yet
                  </td>
                </tr>
              )}
  
            </tbody>
          </table>
        </div>
      </div>
  
    </div>
  </div>
  )
}

export default AdminAllTurfs