import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logoutApi } from '../../server/allApi'
import { toast } from 'react-toastify'
import { clearUser } from '../../utils/userSlice'

const AdminHeader = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout=async()=>{
     try {

        const res=await logoutApi()
        toast.warning('logout sucessfully')
        navigate('/')
        dispatch(clearUser())
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        
     } catch (err) {
        console.log(err.message)
        
     }
  }
  return (
    <div>
    <div className="drawer md:drawer-open z-20">
      {/* TOGGLE */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  
      {/* ---------- MOBILE TOP BAR ---------- */}
      <div className="drawer-content md:hidden">
        <div className="fixed top-0 left-0 right-0 bg-white shadow-sm px-4 py-3 flex items-center justify-between z-30">
          <label htmlFor="my-drawer-2" className="p-2 text-gray-700">
            <i className="fa-solid fa-bars fa-xl"></i>
          </label>
  
          <Link
            to={"/"}
            className="text-lg font-extrabold font-['Lato']
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-emerald-600 to-green-700"
          >
            Kick Z <i className="fa-solid fa-futbol"></i> ne
          </Link>
  
          <div className="w-8" />
        </div>
      </div>
  
      {/* ---------- SIDEBAR ---------- */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
  
        <aside
          className="
            bg-white min-h-screen w-72 p-6
            shadow-[0_10px_18px_rgba(0,0,0,0.12)]
            border-r border-gray-100
            flex flex-col
          "
        >
          {/* LOGO */}
          <div className="mb-8 text-center">
            <Link
              to={"/"}
              className="text-3xl font-extrabold font-['Lato']
                         bg-clip-text text-transparent
                         bg-gradient-to-r from-emerald-600 to-green-700
                         inline-flex items-center gap-2"
            >
              Kick Z <i className="fa-solid fa-futbol text-lg"></i> ne
            </Link>
          </div>
  
          {/* NAVIGATION */}
          <nav className="flex-1 flex flex-col gap-3">
            <NavLink
              to={"/admin/dashboard"}
              className={({ isActive }) =>
                `flex items-center justify-center py-3 rounded-xl text-lg font-medium transition
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-emerald-600 to-green-700 shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Overview
            </NavLink>
  
            <NavLink
              to={"/admin/allowners"}
              className={({ isActive }) =>
                `flex items-center justify-center py-3 rounded-xl text-lg font-medium transition
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-emerald-600 to-green-700 shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Owners
            </NavLink>
  
            <NavLink
              to={"/admin/allusers"}
              className={({ isActive }) =>
                `flex items-center justify-center py-3 rounded-xl text-lg font-medium transition
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-emerald-600 to-green-700 shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Users
            </NavLink>
  
            <NavLink
              to={"/admin/allturfs"}
              className={({ isActive }) =>
                `flex items-center justify-center py-3 rounded-xl text-lg font-medium transition
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-emerald-600 to-green-700 shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Turfs
            </NavLink>
  
            <NavLink
              to={"/admin/allbookings"}
              className={({ isActive }) =>
                `flex items-center justify-center py-3 rounded-xl text-lg font-medium transition
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-emerald-600 to-green-700 shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Bookings
            </NavLink>
          </nav>
  
          {/* LOGOUT */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl font-semibold
                         text-red-600 bg-red-50 hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  </div>
  
  )
}

export default AdminHeader