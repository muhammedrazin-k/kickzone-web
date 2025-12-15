import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logoutApi } from '../../server/allApi'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../utils/userSlice'

const OwnerDrawer = () => {
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
      <div className="drawer  md:drawer-open z-20">
        {/* Toggle input (controls drawer on mobile) */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* ---------- MAIN PAGE / TOPBAR AREA (visible on mobile only) ---------- */}
        {/* On desktop we don't render a fixed bar; on mobile we show a small top bar with the toggle */}
        <div className="drawer-content md:hidden">
          <div className="w-full fixed bg-white shadow-sm px-4 py-3 flex items-center justify-between">
            <label htmlFor="my-drawer-2" className="p-2 text-gray-700">
              <i className="fa-solid fa-bars fa-xl"></i>
            </label>

            <Link
              to={"/"}
              className="text-lg font-extrabold text-emerald-600 font-['Lato']"
            >
              Kick Z <i className="fa-solid fa-futbol text-emerald-600"></i> ne
            </Link>

            {/* placeholder to keep center alignment */}
            <div className="w-8" />
          </div>
        </div>

        {/* ---------- SIDEBAR ---------- */}
        <div className="drawer-side">
          {/* overlay for mobile when drawer is open */}
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <aside
            className="
              p-6 bg-white md:rounded-2xl min-h-screen w-72
              shadow-[0_10px_18px_rgba(0,0,0,0.12)]
              border border-gray-100
              flex flex-col
            "
            aria-label="Owner sidebar"
          >
            {/* LOGO */}
            <div className="mb-6 text-center">
              <Link
                to={"/"}
                className="text-3xl font-extrabold font-['Lato'] bg-clip-text text-transparent
                           bg-gradient-to-r from-emerald-600 to-green-700 inline-flex items-center gap-2"
              >
                Kick Z <i className="fa-solid fa-futbol text-lg"></i> ne
              </Link>
            </div>

            {/* NAV ITEMS */}
            <nav className="flex-1 flex flex-col gap-3">
              {[
                { to: "/owner/dashboard", label: "Overview", icon: "fa-chart-line" },
                { to: "/owner/myturfs", label: "My Turfs", icon: "fa-futbol" },
                { to: "/owner/allbookings", label: "All Bookings", icon: "fa-calendar-check" },
                { to: "/owner/addturf", label: "Add Turf", icon: "fa-plus" },
                { to: "/owner/profile", label: "Profile", icon: "fa-user" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative flex items-center justify-center gap-3 text-lg font-medium py-3 rounded-xl
                     transition-all duration-300 cursor-pointer select-none
                     ${isActive
                       ? "text-white bg-gradient-to-r from-emerald-600 to-green-700 shadow-lg"
                       : "text-gray-700 hover:bg-gray-50"
                     }`
                  }
                >
                  <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Bottom area: Logout */}
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition shadow-sm"
                aria-label="Logout"
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

export default OwnerDrawer