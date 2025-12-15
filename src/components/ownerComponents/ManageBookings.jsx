import { addMonths } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { NavLink } from "react-router-dom";

const ManageBookings = () => {

  const [isModalOpen, SetModalOpen]=useState(false)
  const [startDate,setStartDate]=useState('')

  return (
    <div className="bg-gray-200 w-full pt-10 min-h-[100vh]">
      <div className="bg-white m-6 md:m-10 p-6 rounded-2xl">
        <div className="sm:flex gap-2   justify-between ">
        <button className="px-3 mb-3  sm:mb-auto py-2 bg-green-700 rounded-lg text-white cursor-pointer hover:shadow-lg" onClick={()=>SetModalOpen(true)}>
            <h1>Add Bookings</h1>
          </button>
        <div className="flex gap-4">
        <NavLink
            to={"/owner/myturfs"}
            className={({ isActive }) =>
              `my-auto text-sm  relative after:content-[""] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-green-800 after:left-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                isActive ? "after:scale-x-100 text-blue-800 " : "hover:after:scale-x-100"
              } `
            }
          >
            <h1> <i className="fa-solid fa-house text-2xl sm:text-lg my-auto  "></i></h1>
          </NavLink>
          <NavLink
            to={"/owner/myturfs/1"}
            className={({ isActive }) =>
              `my-auto text-sm  relative after:content-[""] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-green-800 after:left-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                isActive ? "after:scale-x-100 text-blue-800 " : "hover:after:scale-x-100"
              } `
            }
          >
            <h1>Upcoming Bookings</h1>
          </NavLink>
          <NavLink
            to={"/owner/myturfs/myhistory/1"}
            className={({ isActive }) =>
              ` my-auto text-sm   relative after:content-[""] after:absolute after:-bottom-1 after:w-full after:h-[2px] after:bg-green-800 after:left-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
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
                  <th>payment</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ahmmed</td>
                  <td>22 sep 2025</td>
                  <td>5s</td>
                  <td>5:00pm - 6:00pm</td>
                  <td>paid</td>
                  <td>confirmed</td>
                </tr>
                <tr>
                  <td>joju</td>
                  <td>24 sep 2025</td>
                  <td>5s</td>
                  <td>5:00pm - 6:00pm</td>
                  <td>cash</td>
                  <td>confirmed</td>
                </tr>
                <tr>
                  <td>mujeeb</td>
                  <td>28 sep 2025</td>
                  <td>5s</td>
                  <td>7:00pm - 8:00pm</td>
                  <td>pending</td>
                  <td>Awiating</td>
                </tr>
                <tr>
                  <td>salman</td>
                  <td>22 sep 2025</td>
                  <td>6s</td>
                  <td>8:00pm - 9:00pm</td>
                  <td>pending</td>
                  <td>Awaiting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*open a modal */}

      <div>
      {isModalOpen &&<div  className="modal modal-open">
  <div className="modal-box max-w-200 h-150 ">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>SetModalOpen(false)}>✕</button>
   
        <div className="flex flex-col items-center ">
          <div className="my-6 ">
            <h1 className="text-gray-600 font-semibold text-2xl">Book Turf</h1>
          </div>

          <div className="w-full">
            <h1>user Name</h1>
            <input type="text" placeholder=" enter user " className="border-1 border-gray-500 px-3 py-1 rounded-lg w-full" />
          </div>
          <div className="my-2 w-full ">
            <h1>Contact Number</h1>
            <input type="text" placeholder="Enter contact number" className="border-1 border-gray-500 rounded-lg px-3 py-1 w-full" />
          </div>

          <div className="my-2 w-full">
            <h1 className="text-xl font-semibold text-gray-500">Select Slot</h1>
            <div className="flex gap-3">
                <label className="flex gap-2">
              <input
                type="radio"
                name="radio-10"
                className="radio radio-error"
                value={"5s"}
                defaultChecked
                onChange={(e) => setSelectOption(e.target.value)}
              />
              <span>5s</span>
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="radio-10"
                className="radio radio-error"
              />
              <span>6s</span>
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="radio-10"
                className="radio radio-error"
              />
              <span>7s</span>
            </label>
                </div>
          </div>


        <div className="w-full">
          <h1 className="text-lg font-semibold text-gray-500 my-2"> Select Date</h1>
        <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 1)}
              startDate={startDate}
              inline
              showDisabledMonthNavigation
            />
        </div>

        <div className="my-3">
          <h1 className="text-lg font-semibold text-gray-500">Availability</h1>

          <div className="time-shedules start-time my-3 flex flex-wrap gap-3" >
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
              <button className="px-4 py-1 border-2 border-gray-400 rounded-lg bg-gray-100 ">
                <h1>6:00am</h1>
                <p>Sat</p>
              </button>
          </div>
        </div>

        <div className= " my-2 w-full">
          <h1 className="text-lg text-gray-500 font-semibold">Price</h1>
          <input type="number" placeholder="enter turf Price" className="border-1 border-gray-500 px-3 py-1 rounded-lg w-full" />
        </div>

          <div className="my-2 w-full">
            <h1 className="text-xl text-gray-500 font-semibold">Payment Status</h1>
            <div className="flex gap-8 my-2">
  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="paymentStatus"
      value="paid"
      className="w-5 h-5"
    />
    <span className="text-lg font-semibold text-gray-800">Paid</span>
  </label>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="paymentStatus"
      value="pending"
      className="w-5 h-5"
    />
    <span className="text-lg font-semibold text-gray-800">Pending</span>
  </label>
</div>

          </div>

          <div className="my-3 w-full flex gap-2">
            <button className="border-1 border-red-500  w-full py-2 rounded-lg  text-lg hover:bg-red-500 hover:text-white transition-all duration-[800ms]">Cancel</button>
            <button className="bg-green-700 w-full py-2 rounded-lg text-white text-lg">Submit</button>
          </div>

        </div>
  </div>
</div>}
      </div>
    </div>
  );
};

export default ManageBookings;
