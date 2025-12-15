import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-20">

    {/* BRAND ROW */}
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start">
      
      {/* Brand */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          KICK<span className="text-green-600">ZONE</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          © 2025 Techmash Solutions Pvt. Ltd. All rights reserved.
        </p>
      </div>
  
      {/* App store buttons */}
      <div className="flex gap-4 mt-6 md:mt-0">
        <img src="/appstore.png" className="h-10 opacity-90 hover:opacity-100 transition" />
        <img src="/playstore.png" className="h-10 opacity-90 hover:opacity-100 transition" />
      </div>
    </div>
  
    {/* LINKS GRID */}
    <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-2 md:grid-cols-4 gap-10">
  
      <div>
        <h3 className="text-gray-900 font-semibold text-sm mb-4">Company</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li><Link className="hover:text-gray-900">About Us</Link></li>
          <li><Link className="hover:text-gray-900">Blog</Link></li>
          <li><Link className="hover:text-gray-900">Contact</Link></li>
          <li><Link className="hover:text-gray-900">Careers</Link></li>
        </ul>
      </div>
  
      <div>
        <h3 className="text-gray-900 font-semibold text-sm mb-4">Social</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li><Link className="hover:text-gray-900">Instagram</Link></li>
          <li><Link className="hover:text-gray-900">Facebook</Link></li>
          <li><Link className="hover:text-gray-900">LinkedIn</Link></li>
          <li><Link className="hover:text-gray-900">Twitter</Link></li>
        </ul>
      </div>
  
      <div>
        <h3 className="text-gray-900 font-semibold text-sm mb-4">Privacy & Terms</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li><Link className="hover:text-gray-900">FAQs</Link></li>
          <li><Link className="hover:text-gray-900">Privacy Policy</Link></li>
          <li><Link className="hover:text-gray-900">Terms of Service</Link></li>
          <li><Link className="hover:text-gray-900">Cancellation Policy</Link></li>
        </ul>
      </div>
  
      <div>
        <h3 className="text-gray-900 font-semibold text-sm mb-4">Community</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>Football Events</li>
          <li>Player Profiles</li>
          <li>Turf Partners</li>
          <li>Support</li>
        </ul>
      </div>
  
    </div>
  
    {/* BOTTOM BAR */}
    <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
      Built with passion for the football community ⚽
    </div>
  
  </footer>
  );
};

export default Footer;
