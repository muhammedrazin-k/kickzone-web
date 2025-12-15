import React, { useEffect, useState } from 'react'
import OwnerDrawer from '../components/ownerComponents/OwnerDrawer'
import { useSelector } from 'react-redux'
import CardShimmers from '../shimmers/CardShimmers'
import { dashboardOverviewApi } from '../server/allApi'

const OwnerDashboard =() => {
  const userStore=useSelector((store)=>store.user)
  const [isShimmer,setShimmer]=useState(true)
  const [overviewData,setOverviewData]=useState('')

  const dahsboardoverview=async()=>{
    try {
      const res=await dashboardOverviewApi()
      setOverviewData(res.data)
      setShimmer(false)
      
    } catch (err) {
      console.log(err)
      
    }
  }

  useEffect(()=>{
    dahsboardoverview()
  },[])

  if(isShimmer){
    return (
      <CardShimmers/>
    )
  }
 

  return (
    <div className="bg-gray-100 min-h-screen w-full flex">

  {/* Sidebar */}
  <OwnerDrawer />

  {/* Main Content */}
  <div className="flex-1 h-screen overflow-y-auto py-15 md:py-5">

    {/* Welcome Section */}
    <div className="bg-gradient-to-r from-emerald-600 to-green-700 m-6 md:m-10 p-8 rounded-3xl shadow-lg text-white">
      <h1 className="text-3xl font-semibold">
        Hey <span className="font-bold">{userStore.user?.name}</span> 👋
      </h1>
      <p className="text-gray-200 text-lg mt-1 font-['figtree']">
        Here’s your turf analytics summary today
      </p>
    </div>

    {/* Stats Grid */}
    <div className="m-6 md:m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Total Turfs */}
      <div className="bg-white rounded-2xl shadow-md px-6 py-8 hover:shadow-xl transition-all border border-gray-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-amber-500">T</div>
        <h3 className="text-gray-600 font-medium text-sm">Total Turfs</h3>
        <h1 className="text-4xl font-bold text-gray-800 mt-3">{overviewData.totalturfs}</h1>
        <div className="mt-4 h-1 bg-amber-400 w-12 rounded-full group-hover:w-20 transition-all"></div>
      </div>

      {/* Today’s Bookings */}
      <div className="bg-white rounded-2xl shadow-md px-6 py-8 hover:shadow-xl transition-all border border-gray-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-green-600">B</div>
        <h3 className="text-gray-600 font-medium text-sm">Today’s Bookings</h3>
        <h1 className="text-4xl font-bold text-emerald-600 mt-3">{overviewData.totalBookings}</h1>
        <div className="mt-4 h-1 bg-emerald-500 w-12 rounded-full group-hover:w-20 transition-all"></div>
      </div>

      {/* Pending Approval */}
      <div className="bg-white rounded-2xl shadow-md px-6 py-8 hover:shadow-xl transition-all border border-gray-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-pink-500">P</div>
        <h3 className="text-gray-600 font-medium text-sm">Pending Approval</h3>
        <h1 className="text-4xl font-bold text-pink-500 mt-3">{overviewData.pendingTurfs}</h1>
        <div className="mt-4 h-1 bg-pink-400 w-12 rounded-full group-hover:w-20 transition-all"></div>
      </div>

      {/* Blocked Turfs */}
      <div className="bg-white rounded-2xl shadow-md px-6 py-8 hover:shadow-xl transition-all border border-gray-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-red-500">X</div>
        <h3 className="text-gray-600 font-medium text-sm">Blocked Turfs</h3>
        <h1 className="text-4xl font-bold text-red-500 mt-3">{overviewData.blockedTurfs}</h1>
        <div className="mt-4 h-1 bg-red-500 w-12 rounded-full group-hover:w-20 transition-all"></div>
      </div>

    </div>

    {/* ===================== NEW SECTION: ACTIVITY SUMMARY ===================== */}
    <div className="mx-6 md:mx-10 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Today Highlights */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Today’s Highlights</h2>
        <ul className="mt-4 space-y-3 text-sm text-gray-700">
          <li>• New bookings coming in today</li>
          <li>• 95% of turfs are performing well</li>
          <li>• 2 Turfs need your approval</li>
        </ul>
      </div>

      {/* Top Turf Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Top Performing Turf</h2>
        <p className="mt-3 text-gray-600 text-sm">Coming soon: Performance analytics & ratings</p>

        <div className="mt-5 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Graph Placeholder
        </div>
      </div>

      {/* Revenue (Future Feature) */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
        <p className="mt-3 text-gray-600 text-sm">Monthly revenue tracking coming soon</p>

        <div className="mt-5 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          Bar Chart Placeholder
        </div>
      </div>

    </div>

    {/* ===================== NEW SECTION: RECENT BOOKINGS ===================== */}
    <div className="mx-6 md:mx-10 mt-10 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>

      <p className="text-gray-500 text-sm">This section can later show latest bookings.</p>

      <div className="mt-4 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
        Latest bookings data coming soon
      </div>
    </div>

  </div>
</div>
  )
}

export default OwnerDashboard