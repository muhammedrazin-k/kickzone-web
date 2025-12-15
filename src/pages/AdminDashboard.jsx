import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminComponents/AdminHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { adminDashboardApi } from "../server/allApi";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const storeUser = useSelector((store) => store.user);
  const [overViewData, setOverViewData] = useState("");

  const AdminDashboard = async () => {
    try {
      const res = await adminDashboardApi();
      if (res.status == 200) {
        setOverViewData(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    AdminDashboard();
  }, []);
  const data = [
    { date: "Sep 18", bookings: 10 },
    { date: "Sep 19", bookings: 15 },
    { date: "Sep 20", bookings: 8 },
    { date: "Sep 21", bookings: 20 },
    { date: "Sep 22", bookings: 12 },
  ];
  return (
    <div className="bg-gray-100 min-h-[100vh] flex w-full">

    {/* Sidebar / Header */}
    <AdminHeader />
  
    {/* Main Content */}
    <div className="flex-1 h-screen overflow-y-auto py-20  md:py-5">
  
      {/* ===================== WELCOME SECTION ===================== */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 m-6 md:m-10 p-8 rounded-3xl shadow-lg text-white">
        <h1 className="text-3xl font-semibold">
          Hey <span className="font-bold">{storeUser.user?.name}</span> 👋
        </h1>
        <p className="text-emerald-100 text-lg mt-1 font-['figtree']">
          Here’s a quick look at your platform overview
        </p>
      </div>
  
      {/* ===================== STATS GRID ===================== */}
      <div className="m-6 md:m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  
        {/* Total Users */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8 border border-gray-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-amber-500">U</div>
          <h3 className="text-gray-600 font-medium text-sm">Total Users</h3>
          <h1 className="text-4xl font-bold text-gray-800 mt-3">
            {overViewData?.totalUser}
          </h1>
          <div className="mt-4 h-1 bg-amber-400 w-12 rounded-full group-hover:w-20 transition-all"></div>
        </div>
  
        {/* Turf Owners */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8 border border-gray-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-emerald-500">O</div>
          <h3 className="text-gray-600 font-medium text-sm">Turf Owners</h3>
          <h1 className="text-4xl font-bold text-emerald-600 mt-3">
            {overViewData.turfOwners}
          </h1>
          <div className="mt-4 h-1 bg-emerald-500 w-12 rounded-full group-hover:w-20 transition-all"></div>
        </div>
  
        {/* Total Turfs */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8 border border-gray-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-indigo-500">T</div>
          <h3 className="text-gray-600 font-medium text-sm">Total Turfs</h3>
          <h1 className="text-4xl font-bold text-indigo-600 mt-3">
            {overViewData.totalTurfs}
          </h1>
          <div className="mt-4 h-1 bg-indigo-500 w-12 rounded-full group-hover:w-20 transition-all"></div>
        </div>
  
        {/* Pending Approval */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8 border border-gray-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 opacity-10 text-7xl font-bold text-red-500">!</div>
          <h3 className="text-gray-600 font-medium text-sm">Pending Approvals</h3>
          <h1 className="text-4xl font-bold text-red-500 mt-3">
            {overViewData.pendingApproval}
          </h1>
          <div className="mt-4 h-1 bg-red-500 w-12 rounded-full group-hover:w-20 transition-all"></div>
        </div>
  
      </div>
  
      {/* ===================== BOOKING TREND ===================== */}
      <div className="mx-6 md:mx-10 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Booking Trend (Last 7 Days)
        </h2>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
  
      {/* ===================== QUICK ACTIONS ===================== */}
      <div className="mx-6 md:mx-10 mt-10 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
  
        <div className="grid grid-cols-1 gap-4">
          <Link to={"/admin/allturfs"}>
            <button className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">
              Approve Pending Turfs
            </button>
          </Link>
  
          <Link to={"/admin/allbookings"}>
            <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              View All Bookings
            </button>
          </Link>
  
          <Link to={"/admin/allusers"}>
            <button className="w-full py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition">
              Manage Users
            </button>
          </Link>
        </div>
      </div>
  
    </div>
  </div>
  );
};

export default AdminDashboard;
