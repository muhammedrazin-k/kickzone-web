import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutApi } from "../../server/allApi";
import { clearUser } from "../../utils/userSlice";
import SERVER_URL from "../../server/serverURL";

const UserHeader = () => {
  const storeUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      toast.warning("logout sucessfully");
      navigate("/");
      dispatch(clearUser());
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
  <div
    className="
      navbar flex items-center justify-between
      bg-white px-6 sm:px-10
      fixed bottom-0 sm:bottom-auto sm:top-0
      w-full min-h-20 z-50 shadow-sm
    "
  >
    {/* LOGO — only desktop */}
    <div className="hidden sm:flex w-1/3">
      <Link
        to={"/"}
        className="text-xl lg:text-3xl font-extrabold cursor-pointer text-green-700 font-['Lato','sans-serif']"
      >
        Kick Z
        <span>
          <i className="fa-solid fa-futbol text-lg text-green-700"></i>
        </span>
        ne
      </Link>
    </div>

    {/* NAV LINKS — centered for desktop, full width for mobile */}
    <div
      className="
        navLinks flex justify-evenly items-center
        gap-4 sm:gap-8
        w-full sm:w-1/3
        font-['Lato'] text-gray-700
      "
    >
      {/* TURFS */}
      <NavLink
        to={"/user/dashboard"}
        className={({ isActive }) =>
          `
            flex flex-col sm:flex-row items-center gap-1 relative 
            text-xs sm:text-lg
            after:content-[''] after:absolute after:left-0 after:-bottom-1 
            after:w-full after:h-[2px] after:bg-green-600 
            after:scale-x-0 after:origin-left after:transition-transform 
            ${isActive ? "text-gray-700 after:scale-x-100" : "hover:after:scale-x-100"}
          `
        }
      >
        <i className="fa-solid fa-house text-xl sm:text-lg"></i>
        <span>Turfs</span>
      </NavLink>

      {/* BOOKINGS */}
      <NavLink
        to={"/user/all-bookings"}
        className={({ isActive }) =>
          `
            flex flex-col sm:flex-row items-center gap-1 relative 
            text-xs sm:text-lg
            after:content-[''] after:absolute after:left-0 after:-bottom-1 
            after:w-full after:h-[2px] after:bg-green-600
            after:scale-x-0 after:origin-left after:transition-transform 
            ${isActive ? "text-gray-700 after:scale-x-100" : "hover:after:scale-x-100"}
          `
        }
      >
        <i className="fa-solid fa-book text-xl sm:text-lg"></i>
        <span>Bookings</span>
      </NavLink>

      {/* HISTORY */}
      <NavLink
        to={"/user/history"}
        className={({ isActive }) =>
          `
            flex flex-col sm:flex-row items-center gap-1 relative 
            text-xs sm:text-lg
            after:content-[''] after:absolute after:left-0 after:-bottom-1 
            after:w-full after:h-[2px] after:bg-green-600
            after:scale-x-0 after:origin-left after:transition-transform 
            ${isActive ? "text-gray-700 after:scale-x-100" : "hover:after:scale-x-100"}
          `
        }
      >
        <i className="fa-solid fa-mobile text-xl sm:text-lg"></i>
        <span>History</span>
      </NavLink>
    </div>

    {/* PROFILE — always visible */}
    <div className="flex justify-end w-1/3">
      <div className="dropdown dropdown-top sm:dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className=" rounded-full">
            <img
              alt="Profile"
              src={`${SERVER_URL}/uploads/${storeUser?.user?.profileImg}`}
            />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
        >
          <li>
            <Link to={"/user/profile"}>
              <p>Profile</p>
            </Link>
          </li>

          <li>
            <p
              className="hover:text-red-500 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>

 
</div>
  );
};

export default UserHeader;
