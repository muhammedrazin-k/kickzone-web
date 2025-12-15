import React from "react";
import Header from "./Header";

const AboutPage = () => {
  return (
    <div className="min-h-[100vh] bg-gray-100 pt-16 sm:pt-24 font-['figtree']">
  <Header />

  {/* ---------------- HERO ---------------- */}
  <div className="m-6 md:m-10 rounded-3xl overflow-hidden shadow-xl bg-white">
    <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white py-20 px-6 md:px-12 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
        About Kick Zone
      </h1>
      <p className="mt-4 text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
        Your ultimate platform for turf booking & sports management
      </p>
    </div>

    {/* ---------------- DESCRIPTION ---------------- */}
    <div className="px-6 md:px-20 py-12">
      <p className="text-gray-700 text-lg leading-relaxed md:text-xl max-w-5xl mx-auto">
        Kick Zone is a modern web application designed to streamline the booking
        and management of sports turfs, especially football fields. The platform
        connects players, teams, and turf owners by enabling real-time
        availability checks, instant bookings, schedule management and smooth
        communication.
        <br /><br />
        Whether you're a player looking for the nearest turf or an owner
        managing multiple venues, Kick Zone provides a seamless, intuitive, and
        secure experience. Our mission is to make organizing and enjoying sports
        fun, effortless, and community-driven.
      </p>

      {/* ---------------- FEATURES ---------------- */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Instant Booking */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-bolt text-emerald-700 text-xl"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-800">Instant Turf Booking</h3>
          <p className="text-gray-600 mt-1">
            Book your turf instantly with just a few taps — no waiting, no hassle.
          </p>
        </div>

        {/* Real-time Availability */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-clock text-emerald-700 text-xl"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-800">Real-time Availability</h3>
          <p className="text-gray-600 mt-1">
            Check turf slots in real-time so you always book the best time.
          </p>
        </div>

        {/* Turf Management */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-futbol text-emerald-700 text-xl"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-800">Manage Turf Easily</h3>
          <p className="text-gray-600 mt-1">
            Turf owners can manage venues, bookings & schedules all in one place.
          </p>
        </div>

        {/* Secure & Responsive */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-shield-halved text-emerald-700 text-xl"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-800">Responsive & Secure</h3>
          <p className="text-gray-600 mt-1">
            Enjoy smooth, secure interactions on any device — mobile or desktop.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>
  );
};

export default AboutPage;
