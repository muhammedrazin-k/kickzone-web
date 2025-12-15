import React from 'react'

const Advertisment = () => {
  return (
    <div className="m-6 md:m-10 rounded-3xl 
                bg-gradient-to-r from-emerald-600 to-green-700
                px-8 py-10 flex flex-col md:flex-row items-center justify-between
                shadow-xl border border-white/20">

  {/* Text Section */}
  <div className="w-full md:w-1/2 mb-6 md:mb-0">
    <h1 className="text-white text-2xl md:text-3xl font-bold leading-snug font-['figtree']">
      Get the Kick Zone App
      <span className="block text-green-100 font-medium text-lg md:text-xl mt-2">
        Book turfs • Track stats • Smooth experience
      </span>
    </h1>
  </div>

  {/* App Store Buttons */}
  <div className="flex gap-4 md:gap-6 w-full md:w-auto justify-center">

    <a
      href="#"
      className="bg-white rounded-xl shadow-lg px-4 py-2 hover:shadow-2xl transition 
                 hover:scale-[1.05] active:scale-[0.97] flex items-center"
    >
      <img src="/appstore.png" alt="" className="h-10 w-auto" />
    </a>

    <a
      href="#"
      className="bg-white rounded-xl shadow-lg px-4 py-2 hover:shadow-2xl transition 
                 hover:scale-[1.05] active:scale-[0.97] flex items-center"
    >
      <img src="/playstore.png" alt="" className="h-10 w-auto" />
    </a>

  </div>
</div>
  )
}

export default Advertisment