import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import SERVER_URL from '../../server/serverURL'
import { logoutApi } from '../../server/allApi'
import { toast } from 'react-toastify'
import { clearUser } from '../../utils/userSlice'

const Header = () => {

  const userProf=localStorage.getItem('role')
  const storeUser=useSelector((store)=>store.user)
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

  {/* NAVBAR */}
  <div
    className="
      navbar flex justify-between items-center gap-3
      bg-white shadow-md px-6 sm:px-10
      fixed bottom-0 sm:top-0 sm:bottom-auto
      w-full min-h-20 z-50
    "
  >

    {/* LOGO — Only visible on desktop */}
    <div className="hidden sm:flex">
      <a className="text-xl lg:text-3xl font-extrabold cursor-pointer text-green-700 font-['Lato','sans-serif']">
        Kick Z
        <span>
          <i className="fa-solid fa-futbol text-lg text-green-700"></i>
        </span>
        ne
      </a>
    </div>

    {/* NAV LINKS */}
    <div
      className="
        navLinks flex justify-evenly items-center
        w-full sm:w-auto gap-6 sm:gap-10
        font-['Lato'] text-gray-700
      "
    >

      {/* HOME */}
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `flex flex-col sm:flex-row items-center gap-1 relative 
           text-xs sm:text-lg
           after:content-[''] after:absolute after:left-0 after:-bottom-1 
           after:w-full after:h-[2px] after:bg-green-600
           after:scale-x-0 after:origin-left after:transition-transform after:duration-300
           ${isActive ? "text-green-700 after:scale-x-100" : "hover:after:scale-x-100"}`
        }
      >
        <i className="fa-solid fa-house text-xl sm:text-lg"></i>
        <span>Home</span>
      </NavLink>

      {/* ABOUT */}
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          `flex flex-col sm:flex-row items-center gap-1 relative 
           text-xs sm:text-lg
           after:content-[''] after:absolute after:left-0 after:-bottom-1 
           after:w-full after:h-[2px] after:bg-green-600
           after:scale-x-0 after:origin-left after:transition-transform after:duration-300
           ${isActive ? "text-green-700 after:scale-x-100" : "hover:after:scale-x-100"}`
        }
      >
        <i className="fa-solid fa-book text-xl sm:text-lg"></i>
        <span>About</span>
      </NavLink>

      {/* CONTACT */}
      <NavLink
        to={"/contacts"}
        className={({ isActive }) =>
          `flex flex-col sm:flex-row items-center gap-1 relative 
           text-xs sm:text-lg
           after:content-[''] after:absolute after:left-0 after:-bottom-1 
           after:w-full after:h-[2px] after:bg-green-600
           after:scale-x-0 after:origin-left after:transition-transform after:duration-300
           ${isActive ? "text-green-700 after:scale-x-100" : "hover:after:scale-x-100"}`
        }
      >
        <i className="fa-solid fa-mobile text-xl sm:text-lg"></i>
        <span>Contact</span>
      </NavLink>

    </div>

    {/* PROFILE — Desktop only */}
    {userProf && (
      <div className="hidden sm:flex gap-3 items-center">
        <p className="text-sm">
          Welcome <span className="font-semibold">{storeUser.user?.name}</span>
        </p>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className=" rounded-full">
              <img
                alt="user"
                src={`${SERVER_URL}/uploads/${storeUser?.user?.profileImg}`}
                className=' '
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
          >
            {(storeUser?.user?.role=="owner" || storeUser?.user?.role=="user")&&<li>
              <Link to={`/${storeUser?.user?.role}/profile`}>Profile</Link>
            </li>}
            <li>
              <p className="hover:text-red-500 cursor-pointer" onClick={handleLogout}>
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>
    )}

  </div>

  {/* SPACING (to avoid overlap with DESKTOP navbar) */}
  <div className="hidden sm:block h-20"></div>

</div>

  )
}

export default Header