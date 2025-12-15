import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { allUsersApi, blockuserApi } from "../../server/allApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminAllusers = () => {
  const [users, setUsers] = useState([]);
  const getAllUser = async () => {
    try {
      const res = await allUsersApi();
      if (res.status == 200) {
        setUsers(res.data?.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBlock=async(id,reqBody)=>{
    try {
      const res=await blockuserApi(id,{isBlocked:reqBody})
      if(res.status==200){
        toast.success(res.data.message)
        getAllUser()
        
      }
      
    } catch (err) {
      console.log(err.message)
      
    }
  }

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen w-full md:flex">

  <AdminHeader />

  <div className="w-full pt-20 md:pt-5 overflow-y-auto h-screen">

    {/* ===================== PAGE HEADER ===================== */}
    <div className="mx-6 mt-6">
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-white">
          Users Management
        </h1>
        <p className="text-emerald-100 mt-1 font-['figtree']">
          Monitor, manage and control platform users
        </p>
      </div>
    </div>

    {/* ===================== USERS TABLE ===================== */}
    <div className="m-6 bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">

      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Registered Users
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">User Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.emailId}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link to={`/admin/userview/${user._id}`}>
                        <button className="px-4 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                          View
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          handleBlock(
                            user._id,
                            user.isBlocked ? false : true
                          )
                        }
                        className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                          user.isBlocked
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-red-600 font-medium"
                >
                  There are no users
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>
  );
};

export default AdminAllusers;
