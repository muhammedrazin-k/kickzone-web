import React, { useEffect, useState } from 'react'
import UserHeader from '../components/userComponents/UserHeader'
import LogoHeader from '../components/userComponents/LogoHeader'
import TurfCard from '../components/userComponents/TurfCard'
import CardShimmers from '../shimmers/CardShimmers'
import { AllTurfApi } from '../server/allApi'

const UserDashboard = () => {

  const [isShimmer,setShimmer]=useState(true)
  const [allturfs,setAllTurfs]=useState([])

  const getAllTurfCards=async()=>{
    try {
      const res=await AllTurfApi()
      if(res.status==200){
        setAllTurfs(res.data?.data)
        setShimmer(false)
        
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getAllTurfCards()
  },[])

  if(isShimmer){
    return(
      <CardShimmers/>
    )
  }

  return (
    <div className="bg-gray-100 min-h-[100vh] pt-20 pb-24 w-full">
      
    {/* Headers */}
    <UserHeader />
    <LogoHeader />

    {/* Title Section */}
    <div className="bg-white shadow-sm m-6 md:m-10 px-6 sm:px-10 rounded-2xl border border-gray-200">
      <div className="py-6">
        <h1 className="text-xl lg:text-3xl font-bold font-['figtree'] text-gray-800">
          Discover & Book Nearby Venues
        </h1>
        <p className="text-gray-500 mt-2">
          Explore the best turfs around your location.
        </p>
      </div>
    </div>

    {/* Turf Cards Grid */}
    <div className="px-6 md:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {allturfs.length > 0 ? (
          allturfs.map((card) => (
            <div key={card._id}>
              <TurfCard card={card} />
            </div>
          ))
        ) : (
          <div className="text-center text-red-700 p-4 col-span-full font-medium">
            <p>No Turfs Available</p>
          </div>
        )}

      </div>
    </div>

  </div>
  )
}

export default UserDashboard