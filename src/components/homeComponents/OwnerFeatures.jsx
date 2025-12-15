import React from 'react'
import {Link} from 'react-router-dom'
const OwnerFeatures = () => {
  return (
    <div className="m-6 md:m-10 bg-white rounded-3xl shadow-lg overflow-hidden font-['figtree']">

  {/* ---------------- HERO SECTION ---------------- */}
  <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white py-16 px-8 md:px-14 text-center rounded-3xl shadow-inner">
    <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
      Welcome to Your Turf HQ 🌿
    </h1>

    <p className="mt-4 text-sm md:text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
      Your peaceful space to manage turfs, bookings, and daily operations with clarity.
      Crafted to keep you organized, calm, and in full control.
    </p>
  </div>

  {/* ---------------- FEATURE STRIP ---------------- */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-14 py-14">

    <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200 shadow-md hover:shadow-xl transition-all text-center">
      <h3 className="text-xl font-semibold text-gray-900">Organized & Clear</h3>
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        Designed to remove clutter and help you stay sharply focused.
      </p>
    </div>

    <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200 shadow-md hover:shadow-xl transition-all text-center">
      <h3 className="text-xl font-semibold text-gray-900">Owner-Friendly UI</h3>
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        Simple, smooth interactions made exclusively for turf owners.
      </p>
    </div>

    <div className="bg-gray-50 rounded-2xl p-7 border border-gray-200 shadow-md hover:shadow-xl transition-all text-center">
      <h3 className="text-xl font-semibold text-gray-900">Focus on Experience</h3>
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        A layout built to support seamless operations & better customer experience.
      </p>
    </div>

  </div>

  {/* ---------------- ABOUT SECTION ---------------- */}
  <div className="px-8 md:px-14 py-14 bg-gray-50 rounded-3xl shadow-inner">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
      Your Role, Simplified
    </h2>

    <p className="text-gray-600 text-sm md:text-base mt-5 max-w-3xl mx-auto text-center leading-relaxed">
      Whether it's managing bookings, maintaining the turf, coordinating with players,
      or tracking daily activities — this space is built to make your workflow effortless.
      No distractions. No overload. Just a clean, reliable hub for your operations.
    </p>
  </div>

  {/* ---------------- VALUE PROPOSITION GRID ---------------- */}
  <div className="px-8 md:px-14 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">

    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
      <h3 className="text-xl font-semibold text-gray-800">Stay Connected</h3>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Keep track of activity, bookings, and turf updates effortlessly.
      </p>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
      <h3 className="text-xl font-semibold text-gray-800">Built for Consistency</h3>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Smooth layout ensures consistent operations without stress.
      </p>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
      <h3 className="text-xl font-semibold text-gray-800">Effortless Control</h3>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        No clutter — only the tools and structure you need daily.
      </p>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
      <h3 className="text-xl font-semibold text-gray-800">Calm & Focused</h3>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Begin each workday with clarity, confidence, and peace of mind.
      </p>
    </div>

  </div>

  {/* ---------------- FOOTER MESSAGE ---------------- */}
  <div className="py-12 text-center px-6">
    <h3 className="text-2xl font-semibold text-gray-900">You run the turf.</h3>
    <p className="text-gray-600 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
      We’re here to support you with a refined, comfortable, and powerful owner experience —
      every step of the way.
    </p>
  </div>

</div>
  )
}

export default OwnerFeatures