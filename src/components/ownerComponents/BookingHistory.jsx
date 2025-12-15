import React from 'react'
import { NavLink } from 'react-router-dom'

const BookingHistory = () => {
  return (
     <div className="bg-gray-200 w-full pt-10 min-h-[100vh]">
      <div className="bg-white m-6 md:m-10 p-6 rounded-2xl">
        <div className="sm:flex gap-4  justify-between">
            <div className='mb-2 sm:mb-auto'>
            <h1 className='text-2xl text-green-800 font-semibold'>MY Booking History</h1>
            </div>
          <div className='flex justify-end gap-5'>
          <NavLink
            to={"/owner/myturfs"}
            className={({ isActive }) =>
              `my-auto  text-sm relative after:content-[""] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-green-800 after:left-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                isActive ? "after:scale-x-100 text-blue-800 " : "hover:after:scale-x-100"
              } `
            }
          >
            <h1> <i className="fa-solid fa-house text-2xl sm:text-lg my-auto  "></i></h1>
          </NavLink>
          <NavLink
            to={"/owner/myturfs/1"}
            className={({ isActive }) =>
              `my-auto  text-sm relative after:content-[""] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-green-800 after:left-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                isActive ? "after:scale-x-100 text-blue-800 " : "hover:after:scale-x-100"
              } `
            }
          >
            <h1>Upcoming Bookings</h1>
          </NavLink>
          <NavLink
            to={"/owner/myturfs/myhistory/1"}
            className={({ isActive }) =>
              ` my-auto text-sm relative after:content-[""] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-green-800 after:left-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                isActive ? "after:scale-x-100 text-blue-800" : "hover:after:scale-x-100"
              } `
            }
          >
            <h1>Booking History</h1>
          </NavLink>
          </div>

        </div>

        <div className="my-3">
          <div className="overflow-x-auto">
            <table className="table table-md">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Date</th>
                  <th>slot Type</th>
                  <th>Slot time</th>
                  <th>Amount</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ahmmed</td>
                  <td>22 sep 2025</td>
                  <td>5s</td>
                  <td>5:00pm - 6:00pm</td>
                  <td>800</td>
                  <td>completed</td>
                </tr>
                <tr>
                  <td>joju</td>
                  <td>24 sep 2025</td>
                  <td>5s</td>
                  <td>5:00pm - 6:00pm</td>
                  <td>1000</td>
                  <td>completed</td>
                </tr>
                <tr>
                  <td>mujeeb</td>
                  <td>28 sep 2025</td>
                  <td>5s</td>
                  <td>7:00pm - 8:00pm</td>
                  <td>900</td>
                  <td>completed</td>
                </tr>
                <tr>
                  <td>salman</td>
                  <td>22 sep 2025</td>
                  <td>6s</td>
                  <td>8:00pm - 9:00pm</td>
                  <td>1200</td>
                  <td>completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingHistory