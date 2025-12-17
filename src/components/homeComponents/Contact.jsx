import React from 'react'
import Header from './Header'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
    
  return (
    <div className="bg-gray-100 pt-16 sm:pt-14 min-h-[100vh] font-['figtree']">
    <Header />
  
    <div className="m-6 md:m-10">
      <div className="w-full flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">
  
        {/* LEFT SIDE — CONTACT INFO */}
        <div className="md:w-1/2 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white p-10 flex flex-col justify-center gap-6">
  
          <div>
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-md">
              Contact Us
            </h1>
            <p className="text-emerald-100 text-sm md:text-base mt-3 leading-relaxed">
              We would love to hear from you.  
              Reach out through any of the channels below.
            </p>
          </div>
  
          {/* CONTACT DETAILS */}
          <div className="flex flex-col gap-5 text-sm md:text-base">
  
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-white text-xl" />
              <a href="mailto:support@kickzone.com" className="hover:underline">
                support@kickzone.com
              </a>
            </div>
  
            <div className="flex items-center gap-4">
              <FaPhone className="text-white text-xl" />
              <a href="tel:+919876543210" className="hover:underline">
                +91 98765 43210
              </a>
            </div>
  
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-white text-xl" />
              <p>Kannur, Kerala, India</p>
            </div>
  
            <div className="flex items-center gap-4">
              <FaLinkedin className="text-white text-xl" />
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                //http:linkedin.com
              </a>
            </div>
  
            <div className="flex items-center gap-4">
              <FaGithub className="text-white text-xl" />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                //http:github.com
              </a>
            </div>
  
          </div>
        </div>
  
        {/* RIGHT SIDE — IMAGE */}
        <div className="md:w-1/2 bg-gray-50 p-10 flex items-center justify-center">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img
              src="/football-image.jpg"
              alt="Kick Zone Illustration"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
  
      </div>
    </div>
  </div>
  )
}

export default Contact