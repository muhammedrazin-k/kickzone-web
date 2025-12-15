import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Header from '../components/homeComponents/Header'
import Footer from '../components/homeComponents/Footer'
import Feature from '../components/homeComponents/Feature'
import Advertisment from '../components/homeComponents/Advertisment'
import About from '../components/homeComponents/About'
import OwnerFeatures from '../components/homeComponents/OwnerFeatures'
import AdminFeatures from '../components/homeComponents/AdminFeatures'

const Home = () => {
 const userStore=useSelector((store)=>store.user)

  const userRole=localStorage.getItem('role')
  
  let buttonText='Book your Spot'
  let buttonLink='/login'

  if(userRole==='user'){
    buttonText='Book Now'
    buttonLink='/user/dashboard'
  }
  else if(userRole==='owner'){
    buttonText='View Dashboard'
    buttonLink='/owner/dashboard'
  }
  else if(userRole==='admin'){
    buttonText='Go to Dashboard'
    buttonLink='/admin/dashboard'
  }
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <div className='bg-gray-200 pb-20  w-full min-h-[100vh]'>

      <Header/>

      {/* hero section */}
      <div className="bg-white pt-24 pb-20 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

    {/* ================= LEFT CONTENT ================= */}
    <div>
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full 
                      bg-emerald-50 text-emerald-700 text-sm font-semibold">
        ⚽ Kick Zone • Find & Book Turfs
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold 
                     text-gray-800 leading-tight font-['Lato'] max-w-xl">
        FIND TURFS & VENUES
        <span className="text-emerald-600 block">NEARBY</span>
      </h1>

      {/* Description */}
      <p className="mt-5 text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed">
        Seamlessly discover nearby sports venues and book your perfect spot
        for the game. Fast, simple, and built for football lovers.
      </p>

      {/* CTA */}
      <div className="mt-8">
        <Link to={buttonLink}>
          <button
            className="
              bg-gradient-to-r from-emerald-600 to-green-700
              text-white font-semibold text-base md:text-lg
              px-8 py-4 rounded-2xl
              shadow-lg shadow-emerald-600/30
              hover:scale-[1.03] hover:shadow-xl
              transition-all duration-300
            "
          >
            {buttonText}
          </button>
        </Link>
      </div>

      {/* Trust line */}
      <p className="mt-6 text-sm text-gray-400">
        Trusted by local players & turf owners ⚡
      </p>
    </div>

    {/* ================= RIGHT VISUAL ================= */}
    <div className="relative flex justify-center lg:justify-end">

      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-96 h-96 
                      bg-emerald-400/20 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md">

        {/* Phone Mockup */}
        <img
          src="/phone-image.avif"
          alt="Kick Zone App"
          className="rounded-2xl w-full"
        />

        {/* Floating Football */}
        <img
  src="/football.png"
  alt="Football"
  className="
    absolute left-1 bottom-4
    w-15
    animate-bounce md:-left-10
    md:top-1/2 md:bottom-auto
    md:w-24
  "
/>

        {/* Player Image */}
        <img
          src="/man-turf.avif"
          alt="Football Player"
          className="
            absolute -bottom-16 -right-5
            w-32 md:w-44 md:-right-10
            drop-shadow-xl
            rounded-2xl
          "
        />
      </div>
    </div>

  </div>
</div>


       {userRole !=='admin' && userRole !=='owner' &&<Feature userRole={userRole}/>}
       {userRole === 'owner' &&<OwnerFeatures userRole={userRole}/>}
      {userRole === 'admin' && <AdminFeatures userRole={userRole}/>}
       <Advertisment/>

       <About/>

       <Footer/>

      </div>
  )
}

export default Home